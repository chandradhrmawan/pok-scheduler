import { db, QueryTypes } from "../config/database/database.js"
import {
    rencanaKerja1,
    strukturKegiatan1,
    lembarKontrolPenRo,
    getDataLembarKontrol1,
    getDataLingkupKegiatan,
    getDataLingkupKegiatanHdr,
    getDataLingkupKegiatanDtl,
    getDataLingkupKegiatanSubTotal,
    getDataLingkupKegiatanGrandTotal,
    getDataRincianKegiatanHdr,
    getSumDataRincianKegiatanDtl,
    getGrandTotalRincianKegiatan
} from "../models/rawQuery.js";
import { tempRencanaKerja } from "../models/tempRencanaKerja.js";
import { tempStrukturKegiatan } from "../models/tempStrukturKegiatan.js";
import { dLembarKontrol1 } from "../models/dLembarKontrol1.js";
import { dLembarKontrolPenRo } from "../models/dLembarKontrolPenRo.js";
import { tempLingkupKegiatan } from "../models/tempLingkupKegiatan.js";
import { select } from "../helpers/generalHelpers.js";
import { tempRincianKegiatan } from "../models/tempRincianKegiatan.js";
import axios from "axios";


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
                        rkV1[index]['SASARAN_SATUAN'] = dataSatuan ? dataSatuan['SASARAN_SATUAN'] : null
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

const getDataKordinat = async (data) => {
    let dataKordinat = await db.query(`select
    b.UID, 
    d.KDSATKER,
    b.THANG,
    b.DS_STATUS,
    DATE_FORMAT(b.UPLOAD_DATE,'%d-%m-%Y %H:%i:%s') as UPLOAD_DATE, 
    DATE_FORMAT(b.APPROVED_BALAI_DATE,'%d-%m-%Y %H:%i:%s') as APPROVED_BALAI_DATE
from
    d_pok_revision a
    join d_koordinat_status b on a.UID = b.POK_REVISION_UID 
    join d_pok c on c.uid = a.POK_UID 
    join dbzt_satker d on d.UID = c.SATKER_UID 
where
    d.KDSATKER  = $1
    and b.DS_STATUS = $2`, {
        bind: [data['kdsatker'], data['revstatus']],
        plain: true,
        type: QueryTypes.SELECT,
    })
    return dataKordinat
}

const uploadedPokService = async (data) => {
    let dataKordinat = await getDataKordinat(data)
    let uploadedStatus = null
    if (dataKordinat) {
        let postData = {
            satker_code: dataKordinat['KDSATKER'],
            year: dataKordinat['THANG'],
            status: dataKordinat['DS_STATUS'],
            upload_date: dataKordinat['UPLOAD_DATE'],
        }
        await axios.post('http://103.211.50.35/sidako_update/services/uploaded-pok',
            postData).then(function async(response) {
                console.log(response)
                uploadedStatus = response['data']['saved']
            }).catch(function async(error) {
                console.log(error['response']['data'])
                throw error['response']['data']
            });

        await db.query(`UPDATE pok_online.d_koordinat_status
        SET UPLOADED_STATUS=$1
        WHERE UID=$2`, {
            bind: [uploadedStatus, dataKordinat['UID']],
            type: QueryTypes.UPDATE,
        })

    } else {
        return {
            status: false,
            message: 'Pok Not Found'
        }
    }

    return {
        status: true,
    }
}

const approvedPokService = async (data) => {
    let dataKordinat = await getDataKordinat(data)
    let uploadedStatus = null
    if (dataKordinat) {
        let postData = {
            satker_code: dataKordinat['KDSATKER'],
            year: dataKordinat['THANG'],
            status: dataKordinat['DS_STATUS'],
            upload_date: dataKordinat['UPLOAD_DATE'],
            approved_date: dataKordinat['APPROVED_BALAI_DATE'],
        }
        await axios.post('http://103.211.50.35/sidako_update/services/approved-pok',
            postData).then(function async(response) {
                console.log(response)
                uploadedStatus = response['data']['saved']
            }).catch(function async(error) {
                console.log(error['response']['data'])
                throw error['response']['data']
            });

        await db.query(`UPDATE pok_online.d_koordinat_status
        SET UPLOADED_STATUS=$1
        WHERE UID=$2`, {
            bind: [uploadedStatus, dataKordinat['UID']],
            type: QueryTypes.UPDATE,
        })

    } else {
        return {
            status: false,
            message: 'Pok Not Found'
        }
    }

    return {
        status: true,
    }
}

const generateLembarService = async (revUid) => {
    try {
        let isExsist = await dLembarKontrol1.findOne({ where: { D_POK_REVISION_UID: revUid } })
        if (isExsist) {
            console.log(`data d_lembar_kontrol_1 : ${revUid} already exsist`)
            return true
            // delete d_lembar_kontrol_1
        }

        console.log(`start process generate lembar kontrol`)
        // generate d_lembar_kontrol
        let vieName = ['v_cl1_09_14', 'v_cl1_15', 'v_cl1_16', 'v_cl1_17', 'v_cl1_18', 'v_cl1_19', 'v_cl1_20', 'v_cl1_21', 'v_cl1_22', 'v_cl1_23']
        for (let index = 0; index < vieName.length; index++) {
            let data1 = await db.query(getDataLembarKontrol1(vieName[index], revUid), {
                plain: false,
                type: QueryTypes.SELECT,
            })
            console.log(data1)
            console.log(`proces view : ${vieName[index]}`)
            await dLembarKontrol1.bulkCreate(data1)
        }


        let isExsist2 = await dLembarKontrolPenRo.findOne({ where: { D_POK_REVISION_UID: revUid } })
        if (isExsist2) {
            console.log(`data pen ro : ${revUid} already exsist`)
            return true
            // delete d_lembar_kontrol_1
        }

        let data2 = await db.query(lembarKontrolPenRo(revUid), {
            plain: false,
            type: QueryTypes.SELECT,
        })
        console.log(data2)
        console.log(`proces view pen ro : ${revUid}`)
        await dLembarKontrolPenRo.bulkCreate(data2)

        console.log(`proces complete`)
    } catch (err) {
        console.log(err)
    }
}

const generateStrukturKegiatanService = async (revUid) => {
    // const t = await db.transaction();
    try {
        let skExsist = await db.query(`select COUNT(*) as jml from temp_struktur_kegiatan trk where REV_UID = '${revUid}'`, {
            plain: true,
            type: QueryTypes.SELECT,
        })

        if (skExsist['jml'] > 0) {
            console.log(`data struktur kegiatan : ${revUid} already exsist`)
            console.log(`delete temp_struktur_kegiatan revUid : ${revUid}`)
            await db.query(`DELETE from temp_struktur_kegiatan WHERE REV_UID = '${revUid}'`, {
                // transaction: t
            })
            // await t.commit();
        }

        console.log(`start process generate temp_struktur_kegiatan data`)
        let skV1 = await db.query(strukturKegiatan1(revUid), {
            plain: false,
            type: QueryTypes.SELECT,
        })

        if (skV1.length > 0) {
            for (let index = 0; index < skV1.length; index++) {
                console.log(`process generate data sk :  ${skV1[index]['KODE_KEGIATAN']}`)
                if (skV1[index]['KODE_KEGIATAN'].length == 2) {
                    await db.query(`select
                        a.KDPPK1,
                        a.KDHEADER, 
                        a.NMITEM
                    from
                        dbzd_po a
                    where
                        a.D_POK_REVISION_UID = '${revUid}'
                    and KDPPK1 = '01' and KDHEADER = '1'
                    GROUP BY KDPPK1,KDHEADER,NMITEM`, {
                        plain: true,
                        type: QueryTypes.SELECT,
                    }).then(resp1 => {
                        skV1[index]['NAMA_KEGIATAN'] = resp1['NMITEM']
                    })
                } else if (skV1[index]['KODE_KEGIATAN'].length == 4) {
                    await db.query(`select x.* from (
                        select
                            a.KDPPK1,
                            a.KDPROGRAM1,
                            a.KDGIAT1,
                            case
                                when a.KDPAKET1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1, '.', a.KDGIAT1, '.', a.KDPAKET1)
                                when a.KDGIAT1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1, '.', a.KDGIAT1)
                                when a.KDPROGRAM1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1)
                                else a.KDPPK1
                        end AS KODE_KEGIATAN,
                        NMITEM 
                        from
                            dbzd_po a
                        where
                            a.D_POK_REVISION_UID = '${revUid}'
                            and TRIM(a.KDGIAT1) = '') x
                            where x.KODE_KEGIATAN = '${skV1[index]['KODE_KEGIATAN']}'
                         GROUP BY x.KDPPK1,x.KDPROGRAM1,x.KDGIAT1,x.KODE_KEGIATAN`, {
                        plain: true,
                        type: QueryTypes.SELECT,
                    }).then(resp2 => {
                        skV1[index]['NAMA_KEGIATAN'] = resp2['NMITEM']
                    })
                } else if (skV1[index]['KODE_KEGIATAN'].length == 10) {
                    await db.query(`select x.* from (
                        select
                            a.KDPPK1,
                            a.KDPROGRAM1,
                            a.KDGIAT1,
                            case
                                when a.KDPAKET1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1, '.', a.KDGIAT1, '.', a.KDPAKET1)
                                when a.KDGIAT1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1, '.', a.KDGIAT1)
                                when a.KDPROGRAM1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1)
                                else a.KDPPK1
                        end AS KODE_KEGIATAN,
                        NMITEM 
                        from
                            dbzd_po a
                        where
                            a.D_POK_REVISION_UID = '${revUid}'
                            and TRIM(a.KDPAKET1) = '') x
                            where x.KODE_KEGIATAN = '${skV1[index]['KODE_KEGIATAN']}'
                         GROUP BY x.KDPPK1,x.KDPROGRAM1,x.KDGIAT1,x.KODE_KEGIATAN`, {
                        plain: true,
                        type: QueryTypes.SELECT,
                    }).then(resp4 => {
                        skV1[index]['NAMA_KEGIATAN'] = resp4['NMITEM']
                    })
                } else if (skV1[index]['KODE_KEGIATAN'].length == 13) {
                    await db.query(`select x.* from (
                        select
                            a.KDPPK1,
                            a.KDPROGRAM1,
                            a.KDGIAT1,
                            a.LVL,
                            case
                                when a.KDPAKET1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1, '.', a.KDGIAT1, '.', a.KDPAKET1)
                                when a.KDGIAT1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1, '.', a.KDGIAT1)
                                when a.KDPROGRAM1 <> '' then concat(a.KDPPK1, '.', a.KDPROGRAM1)
                                else a.KDPPK1
                        end AS KODE_KEGIATAN,
                        NMITEM 
                        from
                            dbzd_po a
                        where
                            a.D_POK_REVISION_UID = '${revUid}'
                            and LVL = '03'
                            ) x
                            where x.KODE_KEGIATAN = '${skV1[index]['KODE_KEGIATAN']}'
                         GROUP BY x.KDPPK1,x.KDPROGRAM1,x.KDGIAT1,x.KODE_KEGIATAN`, {
                        plain: true,
                        type: QueryTypes.SELECT,
                    }).then(resp5 => {
                        skV1[index]['NAMA_KEGIATAN'] = resp5['NMITEM']
                    })
                }

                //generate sasaran satuan untuk level 4 dan 5
                skV1[index]['SASARAN_SATUAN'] = '-'
                skV1[index]['SASARAN_VOLUME'] = '-'
                if (skV1[index]['KODE_KEGIATAN'].length >= 13) {
                    let dataSatuan = await db.query(`SELECT SASARAN_SATUAN,
                    ROUND(SUM(SASARAN_VOLUME),2) AS SASARAN_VOLUME  
                    FROM v_2_struktur_kegiatan WHERE REV_UID = '${revUid}'
                    AND KODE_KEGIATAN = '${skV1[index]['KODE_KEGIATAN']}'
                    AND SASARAN_SATUAN IN ('M', 'KM', 'DOKUM', 'LAYAN')
                    GROUP BY SASARAN_SATUAN`, {
                        plain: false,
                        type: QueryTypes.SELECT,
                    })

                    if (dataSatuan.length > 1) {
                        let satuan = "", volume = ""
                        for (let i = 0; i < dataSatuan.length; i++) {
                            satuan += `${dataSatuan[i]['SASARAN_SATUAN']}/`
                            volume += `${parseFloat(dataSatuan[i]['SASARAN_VOLUME']).toFixed(2)}/`
                        }
                        skV1[index]['SASARAN_SATUAN'] = satuan.slice(0, -1);
                        skV1[index]['SASARAN_VOLUME'] = volume.slice(0, -1);
                        skV1[index]['KODE_KEGIATAN'] = `** ${skV1[index]['KODE_KEGIATAN']}`
                    } else {
                        skV1[index]['SASARAN_SATUAN'] = dataSatuan[0]['SASARAN_VOLUME'] != '0' ? dataSatuan[0]['SASARAN_SATUAN'] : '-'
                        skV1[index]['SASARAN_VOLUME'] = parseFloat(dataSatuan[0]['SASARAN_VOLUME']).toFixed(2)
                    }
                }

                //kondisi khusus item OPERASIONAL PERKANTORAN
                if (skV1[index]['NAMA_KEGIATAN'] == 'OPERASIONAL PERKANTORAN') {
                    let kegiatanSplit = skV1[index]['KODE_KEGIATAN'].split('.')
                    await db.query(`SELECT
                        KDPPK1,
                        KDPROGRAM1,
                        KDGIAT1,
                        KDPAKET1,
                        LVL,
                        KDIKAT,
                        SUM(JMLIKAT1)/1000 as BELANJA_BARANG_OPERASIONAL
                    from
                        dbzd_po
                    where
                        D_POK_REVISION_UID = '${revUid}'
                        and KDPPK1 = '${kegiatanSplit[0]}'
                        and KDPROGRAM = '${kegiatanSplit[1]}'
                        and KDGIAT1 = '${kegiatanSplit[2]}'
                        and KDPAKET1 = '${kegiatanSplit[3]}'
                        and TRIM(LVL) = '04'`, {
                        plain: true,
                        type: QueryTypes.SELECT,
                    }).then(resp => {
                        skV1[index]['BELANJA_BARANG_OPERASIONAL'] = resp['BELANJA_BARANG_OPERASIONAL']
                        skV1[index]['JUMLAH_TOTAL'] = skV1[index]['BELANJA_BARANG_OPERASIONAL']
                    })
                }
            }
        } else {
            console.log(`data struktur kegiatan : ${revUid} not found`)
        }

        // generate sub total
        // skV1 = await generateSubTotalStrukturKegiatan(skV1)
        // await t.rollback();

        if (skV1.length > 0) await saveStrukturKegiatan(skV1, revUid)
        console.log('end process save data struktur kegiatan')
    } catch (err) {
        // await t.rollback();
        console.log(err)
        throw new Error(err.stack);
    }
}

const saveStrukturKegiatan = async (data, revUid) => {
    // const t = await db.transaction();
    try {
        console.log('process save struktur kegiatan')
        let bulkSaveData = await tempStrukturKegiatan.bulkCreate(data, {
            returning: true,
            // transaction: t
        })
        // await t.commit();

        //re insert dengan sub total per kdppk1
        let kdppk1Arr = await db.query(`select DISTINCT(KDPPK1) AS KDPPK1 
        FROM temp_struktur_kegiatan where
        REV_UID = '${revUid}'
        and KDPPK1 is not null`, {
            plain: false,
            type: QueryTypes.SELECT,
        })

        let resultFinal = []
        for (let index = 0; index < kdppk1Arr.length; index++) {

            //create body data
            let data1 = await db.query(`select * from temp_struktur_kegiatan where REV_UID = '${revUid}' 
            and KDPPK1 = '${kdppk1Arr[index]['KDPPK1']}'`, {
                plain: false,
                type: QueryTypes.SELECT,
            })

            // push body data
            let arrBody = []
            for (let index2 = 0; index2 < data1.length; index2++) {
                data1[index2]['ID'] = null
                arrBody.push(data1[index2])
            }


            //create sub total data
            let data2 = await db.query(`select
                null as ID,
                POK_UID  as POK_UID,
                REV_UID as REV_UID,
                'AWAL' as STATUS,
                '0' as STATUS_DATA,
                null as KODE_KEGIATAN,
                'SUB TOTAL PELAKSANAAN KEGIATAN' as NAMA_KEGIATAN ,
                null as SASARAN_VOLUME,
                null as SASARAN_SATUAN ,
                SUM(BELANJA_PEGAWAI_OPERASIONAL) AS BELANJA_PEGAWAI_OPERASIONAL,
                SUM(BELANJA_BARANG_OPERASIONAL) AS BELANJA_BARANG_OPERASIONAL,
                SUM(BLNJ_BRG_NON_OP_NON_PEND) AS BLNJ_BRG_NON_OP_NON_PEND,
                SUM(BLNJ_BRG_NON_OP_PEND) AS BLNJ_BRG_NON_OP_PEND,
                SUM(BLNJ_BRG_NON_OP_PHLN) AS BLNJ_BRG_NON_OP_PHLN,
                SUM(BLNJ_BRG_NON_OP_SBSN) AS BLNJ_BRG_NON_OP_SBSN,
                SUM(BELANJA_MODAL_OPERASIONAL) AS BELANJA_MODAL_OPERASIONAL,
                SUM(BLNJ_MDL_NON_OP_NON_PEND) AS BLNJ_MDL_NON_OP_NON_PEND,
                SUM(BLNJ_MDL_NON_OP_PEND) AS BLNJ_MDL_NON_OP_PEND,
                SUM(BLNJ_MDL_NON_OP_PHLN) AS BLNJ_MDL_NON_OP_PHLN, 
                SUM(BLNJ_MDL_NON_OP_SBSN) AS BLNJ_MDL_NON_OP_SBSN,
                SUM(JUMLAH_TOTAL) AS JUMLAH_TOTAL,
                'Y' as BOLD,
                0 as PERIODE,
                null as KDPPK1
            from
                temp_struktur_kegiatan
            where
                REV_UID = '${revUid}'
            AND KDPPK1 = '${kdppk1Arr[index]['KDPPK1']}'`, {
                plain: true,
                type: QueryTypes.SELECT,
            })
            // resultFinal.push(data2)
            arrBody.push(data2)
            resultFinal = resultFinal.concat(arrBody)
        }


        //delete temp_sk
        await db.query(`DELETE from temp_struktur_kegiatan WHERE REV_UID = '${revUid}'`, {
            // transaction: t
        })
        // await t.commit();

        console.log(resultFinal)

        console.log('process save struktur kegiatan final')
        let bulkSaveData2 = await tempStrukturKegiatan.bulkCreate(resultFinal, {
            returning: true,
            // transaction: t
        })
        // await t.commit();

        // get nama satker
        let nmSatker = "";
        await db.query(`select
            c.NMSATKER 
        from
            d_pok_revision a
            join d_pok b on a.POK_UID = b.uid
            join dbzt_satker c on c.UID = b.SATKER_UID 
        where
            a.UID = '${revUid}'`, {
            plain: true,
            type: QueryTypes.SELECT,
        }).then(resp1 => {
            nmSatker = resp1['NMSATKER']
        })

        // console.log('process generate total data struktur kegiatan')
        await db.query(`insert into temp_struktur_kegiatan 
        select
            null as ID,
            POK_UID  as POK_UID,
            REV_UID as REV_UID,
            'AWAL' as STATUS,
            '0' as STATUS_DATA,
            null as KODE_KEGIATAN,
            'JUMLAH TOTAL ${nmSatker}' as NAMA_KEGIATAN ,
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
            0 as PERIODE,
            null as KDPPK1
        from
            temp_struktur_kegiatan trk
        where REV_UID = '${revUid}'
        and KODE_KEGIATAN IS NULL`, {
            type: QueryTypes.INSERT
        })
        // await t.commit();
        return bulkSaveData
    } catch (err) {
        // await t.rollback();
        throw new Error(err);
    }
}

const regenerateReportLembarKontrol = async () => {
    let dataReport = await db.query(`
    select x.* from (
        select
            a.SATKER_UID,
            b.KDSATKER,
            c.UID AS REV_UID,
            (select count (*) from d_lembar_kontrol_1 where D_POK_REVISION_UID = c.UID) AS JML
        from
            d_pok a
            join dbzt_satker b on a.SATKER_UID = b.UID 
            join d_pok_revision c on c.POK_UID  = a.UID) x
        where x.jml = 0`, {
        plain: false,
        type: QueryTypes.SELECT,
    })

    console.log(dataReport)

    Promise.all([
        await generateLembarService('d53a86aa-65b3-4baf-a4a4-e508a3081c35'),
        await generateLembarService('a0564936-a726-48c1-a41f-bc66450ef679'),
    ]).then(resp => {
        console.log('finished all promises')
    })

}

const generateLingkupKegiatanService = async (revUid) => {
    try {

        let isExsist = await tempLingkupKegiatan.count({ where: { REV_UID: revUid } })
        if (isExsist > 0) {
            console.log(`data lingkup kegiatan uid : ${revUid} already exsist`)
            return
        }

        console.log(`start proces generate data lingkup kegiatan uid : ${revUid}`)
        let dataLingkupKegiatanHdr = await select(getDataLingkupKegiatanHdr(revUid))

        let resultData = []
        for (let index = 0; index < dataLingkupKegiatanHdr.length; index++) {
            let detailData = await select(getDataLingkupKegiatanDtl(revUid, dataLingkupKegiatanHdr[index]['KODE_KEGIATAN']))

            if (detailData.length > 0) {
                for (let indexDtl = 0; indexDtl < detailData.length; indexDtl++) {
                    resultData.push(detailData[indexDtl])
                }

                let subTotal = await select(getDataLingkupKegiatanSubTotal(revUid, dataLingkupKegiatanHdr[index]['KODE_KEGIATAN']), true)
                if (subTotal) resultData.push(subTotal)
            }
        }

        // save dtl data lingkup kegiatan
        await tempLingkupKegiatan.bulkCreate(resultData)

        // generate total data lingkup kegiatan
        let dataSatker = await getPokSatkerInfo(revUid)
        let grandTotal = await select(getDataLingkupKegiatanGrandTotal(revUid, dataSatker['NMSATKER']), true)
        if (grandTotal) await tempLingkupKegiatan.create(grandTotal)

        console.log(`proces generate data lingkup kegiatan uid : ${revUid} complete`)

    } catch (err) {
        console.log(err)
    }
}

const getPokSatkerInfo = async (revUid) => {
    let sql = `select
        c.KDSATKER,
        c.NMSATKER 
    from
        d_pok_revision a
        join d_pok b on a.POK_UID = b.uid
        join dbzt_satker c on c.UID = b.SATKER_UID 
    where
        a.UID = '${revUid}'`
    return await select(sql, true)
}

const generateLingkupKegiatanBulkService = async () => {
    let sql = `select x.* from (
        select
            a.SATKER_UID,
            b.KDSATKER,
            c.UID AS REV_UID,
            (select count (*) from temp_lingkup_kegiatan tlk  where REV_UID = c.UID) AS JML
        from
            d_pok a
            join dbzt_satker b on a.SATKER_UID = b.UID 
            join d_pok_revision c on c.POK_UID  = a.UID) x
        where x.jml = 0`
    let dataReport = await select(sql)
    for (let index = 0; index < dataReport.length; index++) {
        await generateLingkupKegiatanService(dataReport[index]['REV_UID'])
    }
    console.log('finished')
}

const generateRincianKegiatanService = async (revUid) => {
    try {

        let isExsist = await tempRincianKegiatan.count({ where: { REV_UID: revUid } })
        if (isExsist > 0) {
            console.log(`data rincian kegiatan uid : ${revUid} already exsist`)
            return
        }

        console.log(`start proces generate data rincian kegiatan uid : ${revUid}`)
        let dataRincianKegiatanHdr = await select(getDataRincianKegiatanHdr(revUid))

        let resultData = []
        for (let index = 0; index < dataRincianKegiatanHdr.length; index++) {
            console.log(`${dataRincianKegiatanHdr[index]['KODE_KEGIATAN']}`)

            if (dataRincianKegiatanHdr[index]['NOITEM1'] == '0') {
                let detailData = await select(getSumDataRincianKegiatanDtl(revUid, dataRincianKegiatanHdr[index]['KODE_KEGIATAN']), true)
                if (detailData) {
                    dataRincianKegiatanHdr[index]['JUMLAH_BIAYA'] = detailData['TOTAL_JUMLAH_BIAYA']
                }
            }
            resultData.push(dataRincianKegiatanHdr[index])
        }

        // save dtl data rincian kegiatan
        await tempRincianKegiatan.bulkCreate(resultData)

        // generate total data rincian kegiatan
        console.log(`proces generate grand total data rincian kegiatan uid : ${revUid} complete`)
        let grandTotal = await select(getGrandTotalRincianKegiatan(revUid), true)
        if (grandTotal) await tempRincianKegiatan.create(grandTotal)

        console.log(`proces generate data rincian kegiatan uid : ${revUid} complete`)
    } catch (err) {
        console.log(err)
    }
}

export {
    getDataPok,
    saveRencanaKerja,
    delPok,
    uploadedPokService,
    approvedPokService,
    generateLembarService,
    generateStrukturKegiatanService,
    regenerateReportLembarKontrol,
    generateLingkupKegiatanService,
    generateLingkupKegiatanBulkService,
    generateRincianKegiatanService
}