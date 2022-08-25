import { db, QueryTypes } from "../config/database/database.js"
import {
    rencanaKerja1,
} from "../models/rawQuery.js";
import { tempRencanaKerja } from "../models/tempRencanaKerja.js";

const getDataPok = async (revUid) => {
    try {
        let rkV1 = await db.query(rencanaKerja1(revUid), {
            plain: false,
            type: QueryTypes.SELECT,
        })

        if (rkV1) {
            for (let index = 0; index < rkV1.length; index++) {
                console.log(index)
                let resultProc = {};
                await db.query(`CALL f_multi('${revUid}','${rkV1[index]['KODE_KEGIATAN']}',@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12)`, {
                }).then(async (resp) => {
                    let rkV2 = await db.query(`SELECT 
                            @1 AS R_TOTAL_SASARAN_VOLUME,
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

                    if (rkV2['R_TOTAL_SASARAN_VOLUME'] != null || rkV2['R_TOTAL_SASARAN_VOLUME'] != undefined) {
                        rkV1[index]['SASARAN_VOLUME'] = rkV2['R_TOTAL_SASARAN_VOLUME']
                        rkV1[index]['BELANJA_PEGAWAI_OPERASIONAL'] = rkV2['R_TOTAL_BELANJA_PEGAWAI_OPERASIONAL']
                        rkV1[index]['BLNJ_BRG_NON_OP_NON_PEND'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_NON_PEND']
                        rkV1[index]['BELANJA_BARANG_OPERASIONAL'] = rkV2['R_TOTAL_BELANJA_BARANG_OPERASIONAL']
                        rkV1[index]['BLNJ_BRG_NON_OP_PHLN'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_PHLN']
                        rkV1[index]['BLNJ_BRG_NON_OP_SBSN'] = rkV2['R_TOTAL_BLNJ_BRG_NON_OP_SBSN']
                        rkV1[index]['BELANJA_MODAL_OPERASIONAL'] = rkV2['R_TOTAL_BELANJA_MODAL_OPERASIONAL']
                        rkV1[index]['BLNJ_MDL_NON_OP_NON_PEND'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_NON_PEND']
                        rkV1[index]['BLNJ_MDL_NON_OP_PEND'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_PEND']
                        rkV1[index]['BLNJ_MDL_NON_OP_PHLN'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_PHLN']
                        rkV1[index]['BLNJ_MDL_NON_OP_SBSN'] = rkV2['R_TOTAL_BLNJ_MDL_NON_OP_SBSN']
                    }
                })
            }
        }
        return rkV1
    } catch (err) {
        throw new Error(err.stack);
    }
}

const saveRencanaKerja = async (data) => {
    try {
        let bulkSaveData = await tempRencanaKerja.bulkCreate(data)
        return bulkSaveData
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}
export {
    getDataPok,
    saveRencanaKerja
}