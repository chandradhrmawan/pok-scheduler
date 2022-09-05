import { db, QueryTypes } from "../config/database/database.js"
import {
    rencanaKerja1,
} from "../models/rawQuery.js";
import { tempRencanaKerja } from "../models/tempRencanaKerja.js";

const getDataPok = async (revUid) => {
    try {

        let rkExsist = await db.query(`select COUNT(*) as jml from temp_rencana_kerja trk where REV_UID = '${revUid}'`, {
            plain: true,
            type: QueryTypes.SELECT,
        })

        if (rkExsist['jml'] > 0) {
            console.log(`data rk : ${revUid} already exsist`)
            return;
        }

        console.log(`start process generate pok data`)
        let rkV1 = await db.query(rencanaKerja1(revUid), {
            plain: false,
            type: QueryTypes.SELECT,
        })

        if (rkV1.length > 0) {
            for (let index = 0; index < rkV1.length; index++) {
                await db.query(`CALL f_multi('${revUid}','${rkV1[index]['KODE_KEGIATAN']}',@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12)`, {
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
                            @12 AS R_TOTAL_BLNJ_MDL_NON_OP_SBSN;`, {
                        plain: true,
                        type: QueryTypes.SELECT,
                    })

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
                })
            }
        } else {
            console.log(`data rk : ${revUid} not found`)
        }

        if (rkV1.length > 0) await saveRencanaKerja(rkV1, revUid)
        console.log('end process save data rk')
    } catch (err) {
        console.log(err)
        throw new Error(err.stack);
    }
}

const saveRencanaKerja = async (data, revUid) => {
    try {
        console.log('process save data rk')
        let bulkSaveData = await tempRencanaKerja.bulkCreate(data)


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
        })
        return bulkSaveData
    } catch (err) {
        throw new Error(err);
    }
}
export {
    getDataPok,
    saveRencanaKerja
}