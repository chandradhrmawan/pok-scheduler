import { db, QueryTypes } from "../config/database/database.js"

const fixDataLembarKontrolPenRo = async (rawData) => {
    try {
        let resultData = []
        for (let index = 0; index < rawData.length; index++) {
            let strSplit = rawData[index]['NAMA_RINCIAN_OUTPUT'].split('.')
            let KDOUTPUT = strSplit[0]
            let KDSOUTPUT = strSplit[1].substr(0, 3)
            let dataVol = await db.query(`select
                sat.KDOUTPUT,
                sat.KDSOUTPUT,
                round((sat.VOLKEG), 2) AS VAL,
                ucase(sat.SATKEG) AS SATKEG
            from
                pok_online.tr_satuan_3 sat
            where
                sat.KDJNSBAN IS NOT NULL
                AND sat.SATKEG = '${rawData[index]['SATUAN']}'
                and sat.KDSATKER = '${rawData[index]['KDSATKER']}'
                and sat.KDOUTPUT = '${KDOUTPUT}'
                and sat.KDSOUTPUT = '${KDSOUTPUT}'
                and sat.LVL = '05'
            group by
                sat.KDOUTPUT,
                sat.KDSOUTPUT,
                sat.KDSATKER,
                sat.THANG`, {
                plain: true,
                type: QueryTypes.SELECT,
            })

            if (dataVol) {
                rawData[index]['AWAL_VOL'] = dataVol['VAL']
            }

            let dataVolAkhir = await db.query(`select
                sat.KDOUTPUT,
                sat.KDSOUTPUT,
                round(sum(sat.VOLKEG), 2) AS VAL,
                ucase(sat.SATKEG) AS SATKEG
            from
                pok_online.dbzd_po sat
            where
                sat.KDJNSBAN = '0'
                and D_POK_REVISION_UID = '${rawData[index]['D_POK_REVISION_UID']}'
                and sat.KDOUTPUT = '${KDOUTPUT}'
                and sat.KDSOUTPUT = '${KDSOUTPUT}'
                AND sat.SATKEG = '${rawData[index]['SATUAN']}'
                AND sat.SATKEG = sat.SNF_SAT 
            group by
                sat.KDOUTPUT,
                sat.KDSOUTPUT,
                sat.KDSATKER,
                sat.THANG`, {
                plain: true,
                type: QueryTypes.SELECT,
            })

            if (dataVolAkhir) {
                rawData[index]['AKHIR_VOL'] = dataVolAkhir['VAL']
            }

            if (rawData[index]['SATUAN'] == 'LAYANAN' || rawData[index]['SATUAN'] == 'DOKUMEN' || rawData[index]['SATUAN'] == 'UNIT') {
                let dataVolAkhir1 = await db.query(`select
                    sat.KDJNSBAN,
                    sat.KDOUTPUT,
                    sat.KDSOUTPUT,
                    sat.SATKEG,
                    sat.VOLKEG AS VAL
                from
                    pok_online.dbzd_po sat
                where
                    1=1
                    and D_POK_REVISION_UID = '${rawData[index]['D_POK_REVISION_UID']}'
                    and sat.KDOUTPUT = '${KDOUTPUT}'
                    and sat.KDSOUTPUT = '${KDSOUTPUT}'
                    AND sat.SATKEG = SUBSTR('${rawData[index]['SATUAN']}',1,5)
                    AND sat.SATKEG = sat.SNF_SAT
                    AND LVL = '05' 
                group by
                    sat.KDJNSBAN,
                    sat.KDOUTPUT,
                    sat.KDSOUTPUT,
                    sat.SATKEG,
                    sat.VOLKEG`, {
                    plain: true,
                    type: QueryTypes.SELECT,
                })

                if (dataVolAkhir1) {
                    rawData[index]['AKHIR_VOL'] = dataVolAkhir1['VAL']
                }

                let dataVol1 = await db.query(`select
                    sat.KDOUTPUT,
                    sat.KDSOUTPUT,
                    sat.VOLKEG,
                    VOLKEG AS VAL,
                    ucase(sat.SATKEG) AS SATKEG,
                    LVL 
                from
                    pok_online.tr_satuan_3 sat
                where
                1=1
                and sat.SATKEG = SUBSTR('${rawData[index]['SATUAN']}',1,5)	
                and sat.KDSATKER = '${rawData[index]['KDSATKER']}'
                and sat.KDOUTPUT = '${KDOUTPUT}'
                and sat.KDSOUTPUT = '${KDSOUTPUT}'
                and sat.LVL = '05'
                group by
                    sat.KDOUTPUT,
                    sat.KDSOUTPUT,
                    sat.KDSATKER,
                    sat.THANG,
                    sat.LVL`, {
                    plain: true,
                    type: QueryTypes.SELECT,
                })

                if (dataVol1) {
                    rawData[index]['AWAL_VOL'] = dataVol1['VAL']
                }
            }
            resultData.push(rawData[index])
        }
        return resultData
    } catch (err) {
        console.log(err)
        return rawData
    }

}

export { fixDataLembarKontrolPenRo }