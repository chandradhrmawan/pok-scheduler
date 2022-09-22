import { db, QueryTypes } from "../config/database/database.js"
import {
    rencanaKerja1,
} from "../models/rawQuery.js";
import { tempRencanaKerja } from "../models/tempRencanaKerja.js";

const getDataPok = async (revUid) => {
    const t = await db.transaction();
    try {
        let rkExsist = await db.query(`select COUNT(*) as jml from temp_rencana_kerja trk where REV_UID = '${revUid}'`, {
            plain: true,
            type: QueryTypes.SELECT,
        })

        if (rkExsist['jml'] > 0) {
            console.log(`data rk : ${revUid} already exsist`)
            console.log(`delete temp_rencana_kerja revUid : ${revUid}`)
            await db.query(`DELETE from temp_rencana_kerja WHERE REV_UID = '${revUid}'`, {
                transaction: t
            })
            await t.commit();
        }

        console.log(`start process generate pok data`)
        let rkV1 = await db.query(rencanaKerja1(revUid), {
            plain: false,
            type: QueryTypes.SELECT,
        })

        if (rkV1.length > 0) {
            for (let index = 0; index < rkV1.length; index++) {
                await db.query(`CALL f_multi('${revUid}','${rkV1[index]['KODE_KEGIATAN']}',@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12,@13)`, {
                }).then(async (resp) => {
                    console.log(`process generate data : ${index + 1} | ${rkV1[index]['KODE_KEGIATAN']}`);
                    let rkV2 = await db.query(`SELECT 
                            @2 AS R_TOTAL_BLNJ_BRG_NON_OP_NON_PEND,
                            @3 AS R_TOTAL_BELANJA_PEGAWAI_OPERASIONAL,
                            @4 AS R_TOTAL_BELANJA_BARANG_OPERASIONAL,
                            @5 AS R_TOTAL_BLNJ_BRG_NON_OP_PEND,
                            @6 AS R_TOTAL_BLNJ_BRG_NON_OP_PHLN,
                            @7 AS R_TOTAL_BLNJ_BRG_NON_OP_SBSN,
                            @8 AS R_TOTAL_BELANJA_MODAL_OPERASIONAL,
                            @9 AS R_TOTAL_BLNJ_MDL_NON_OP_NON_PEND,
                            @10 AS R_TOTAL_BLNJ_MDL_NON_OP_PEND,
                            @11 AS R_TOTAL_BLNJ_MDL_NON_OP_PHLN,
                            @12 AS R_TOTAL_BLNJ_MDL_NON_OP_SBSN,
                            @13 AS R_TOTAL_SASARAN_VOLUME`, {
                        plain: true,
                        type: QueryTypes.SELECT,
                    })

                    //generate sasaran satuan untuk level 4 dan 5
                    if (rkV1[index]['KODE_KEGIATAN'].length >= 14) {
                        let dataSatuan = await db.query(`SELECT SASARAN_SATUAN 
                        FROM v_1_rencana_kerja WHERE REV_UID = '${revUid}'
                        AND KODE_KEGIATAN = '${rkV1[index]['KODE_KEGIATAN']}'
                        AND SASARAN_SATUAN IN ('M', 'KM', 'DOKUM', 'LAYAN')
                        GROUP BY SASARAN_SATUAN`, {
                            plain: true,
                            type: QueryTypes.SELECT,
                        })
                        rkV1[index]['SASARAN_SATUAN'] = dataSatuan['SASARAN_SATUAN']
                    }

                    rkV1[index]['SASARAN_VOLUME'] = rkV2['R_TOTAL_SASARAN_VOLUME']
                    rkV1[index]['BLNJ_BRG_NON_OP_NON_PEND'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_NON_PEND']
                    rkV1[index]['BELANJA_PEGAWAI_OPERASIONAL'] = rkV2['R_TOTAL_BELANJA_PEGAWAI_OPERASIONAL']
                    rkV1[index]['BELANJA_BARANG_OPERASIONAL'] = rkV2['R_TOTAL_BELANJA_BARANG_OPERASIONAL']
                    rkV1[index]['BLNJ_BRG_NON_OP_PEND'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_PEND']
                    rkV1[index]['BLNJ_BRG_NON_OP_PHLN'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_PHLN']
                    rkV1[index]['BLNJ_BRG_NON_OP_SBSN'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_SBSN']
                    rkV1[index]['BELANJA_MODAL_OPERASIONAL'] = rkV2['R_TOTAL_BELANJA_MODAL_OPERASIONAL']
                    rkV1[index]['BLNJ_MDL_NON_OP_NON_PEND'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_NON_PEND']
                    rkV1[index]['BLNJ_MDL_NON_OP_PEND'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_PEND']
                    rkV1[index]['BLNJ_MDL_NON_OP_PHLN'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_PHLN']
                    rkV1[index]['BLNJ_MDL_NON_OP_SBSN'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_SBSN']
                    rkV1[index]['JUMLAH_TOTAL'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_NON_PEND']
                        + rkV2['R_TOTAL_BELANJA_PEGAWAI_OPERASIONAL']
                        + rkV2['R_TOTAL_BELANJA_BARANG_OPERASIONAL']
                        + rkV2['R_TOTAL_BLNJ_BRG_NON_OP_PEND']
                        + rkV2['R_TOTAL_BLNJ_BRG_NON_OP_PHLN']
                        + rkV2['R_TOTAL_BLNJ_BRG_NON_OP_SBSN']
                        + rkV2['R_TOTAL_BELANJA_MODAL_OPERASIONAL']
                        + rkV2['R_TOTAL_BLNJ_MDL_NON_OP_NON_PEND']
                        + rkV2['R_TOTAL_BLNJ_MDL_NON_OP_PEND']
                        + rkV2['R_TOTAL_BLNJ_MDL_NON_OP_PHLN']
                        + rkV2['R_TOTAL_BLNJ_MDL_NON_OP_SBSN']

                })
            }
        } else {
            console.log(`data rk : ${revUid} not found`)
        }

        if (rkV1.length > 0) await saveRencanaKerja(rkV1, revUid)
        console.log('end process save data rk')
    } catch (err) {
        await t.rollback();
        console.log(err)
        throw new Error(err.stack);
    }
}

const saveRencanaKerja = async (data, revUid) => {
    const t = await db.transaction();
    try {
        console.log('process save data rk')
        let bulkSaveData = await tempRencanaKerja.bulkCreate(data, {
            transaction: t
        })

        console.log('process generate total data rk')
        await db.query(`insert into temp_rencana_kerja 
        select
            null as ID,
            POK_UID  as POK_UID,
            REV_UID as REV_UID,
            POK_REVISION_TYPE_UID as POK_REVISION_TYPE_UID, 
            'AWAL' as STATUS,
            '0' as STATUS_DATA,
            null as KODE_KEGIATAN,
            'JUMLAH TOTAL' as NAMA_KEGIATAN ,
            null as SASARAN_VOLUME,
            null as SASARAN_SATUAN ,
            SUM(BELANJA_PEGAWAI_OPERASIONAL),
            SUM(BELANJA_BARANG_OPERASIONAL),
            SUM(BLNJ_BRG_NON_OP_NON_PEND),
            SUM(BLNJ_BRG_NON_OP_PEND),
            SUM(BLNJ_BRG_NON_OP_PHLN),
            SUM(BLNJ_BRG_NON_OP_SBSN),
            SUM(BELANJA_MODAL_OPERASIONAL),
            SUM(BLNJ_MDL_NON_OP_NON_PEND),
            SUM(BLNJ_MDL_NON_OP_PEND),
            SUM(BLNJ_MDL_NON_OP_PHLN), 
            SUM(BLNJ_MDL_NON_OP_SBSN),
            SUM(JUMLAH_TOTAL),
            'Y' as BOLD,
            0 as PERIODE 
        from
            temp_rencana_kerja trk
        where REV_UID = '${revUid}'
        and LENGTH(KODE_KEGIATAN) = '2'`, {
            type: QueryTypes.INSERT,
            transaction: t
        })
        await t.commit();
        return bulkSaveData
    } catch (err) {
        await t.rollback();
        throw new Error(err);
    }
}

const delPok = async (data) => {
    let counter = 0;
    for (let i = 0; i < data.length; i++) {

        let dataSatker = await db.query(`
        select 
        a.UID as POK_UID,
        c.UID as REV_UID,
        b.KDSATKER
        from 
        d_pok a
        left join dbzt_satker b on a.SATKER_UID  = b.UID 
        left join d_pok_revision c on c.pok_uid = a.uid
        where a.UID = '${data[i]['pokUid']}'`, {
            plain: true,
            type: QueryTypes.SELECT
        });
        if (dataSatker) {
            counter++;
            await db.query(`DELETE from dbzd_trktrm WHERE KDSATKER = '${dataSatker['KDSATKER']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_akun WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_ds WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_indikasijbtn WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_indikasijln WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_item WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_kmpnen WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_output WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_po WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_ruasjbtn WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_ruasjln WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_skmpnen WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_soutput WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from d_pok_signer WHERE POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from d_koordinat_status WHERE POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from d_pok_document WHERE POK_UID = '${data[i]['pokUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from d_paket WHERE POK_UID = '${data[i]['pokUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from dbzd_koordinat_db WHERE D_POK_REVISION_UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from d_lembar_kontrol_1 WHERE POK_UID = '${data[i]['pokUid']}'`, {
                logging: console.log
            })
            await db.query(`DELETE from d_pok_revision WHERE UID = '${data[i]['revUid']}'`, {
                logging: console.log
            })
            try {
                await db.query(`DELETE from d_pok WHERE UID = '${data[i]['pokUid']}'`, {
                    logging: console.log
                })
            } catch (err) {
                console.log(`err d_pok uid : ${data[i]['pokUid']}`)
            }
        }
    }
}

const getDataPokF = async (revUid, kodeKegiatan) => {
    try {
        let ret;
        await db.query(`CALL f_multi('${revUid}','${kodeKegiatan}',@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12)`, {
        }).then(async (resp) => {
            await db.query(`SELECT 
                            @2 AS R_TOTAL_BLNJ_BRG_NON_OP_NON_PEND,
                            @3 AS R_TOTAL_BELANJA_PEGAWAI_OPERASIONAL,
                            @4 AS R_TOTAL_BELANJA_BARANG_OPERASIONAL,
                            @5 AS R_TOTAL_BLNJ_BRG_NON_OP_PEND,
                            @6 AS R_TOTAL_BLNJ_BRG_NON_OP_PHLN,
                            @7 AS R_TOTAL_BLNJ_BRG_NON_OP_SBSN,
                            @8 AS R_TOTAL_BELANJA_MODAL_OPERASIONAL,
                            @9 AS R_TOTAL_BLNJ_MDL_NON_OP_NON_PEND,
                            @10 AS R_TOTAL_BLNJ_MDL_NON_OP_PEND,
                            @11 AS R_TOTAL_BLNJ_MDL_NON_OP_PHLN,
                            @12 AS R_TOTAL_BLNJ_MDL_NON_OP_SBSN`, {
                plain: true,
                type: QueryTypes.SELECT,
            }).then(async (resp1) => {
                ret = resp1
            })
        })
        return ret
    } catch (err) {
        console.log(err)
        throw new Error(err.stack);
    }
}
export {
    getDataPok,
    saveRencanaKerja,
    delPok,
    getDataPokF
}