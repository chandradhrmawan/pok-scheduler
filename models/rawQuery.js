const rencanaKerja1 = (revUid) => {
    const query = `select
    b.POK_UID AS POK_UID,
    b.REV_UID AS REV_UID,
    b.POK_REVISION_TYPE_UID AS POK_REVISION_TYPE_UID,
    b.STATUS AS STATUS,
    b.STATUS_DATA AS STATUS_DATA,
    b.KODE_KEGIATAN AS KODE_KEGIATAN,
    c.NAMA_KEGIATAN AS NAMA_KEGIATAN,
    b.SASARAN_VOLUME AS SASARAN_VOLUME,
    c.SASARAN_SATUAN AS SASARAN_SATUAN,
    b.BELANJA_PEGAWAI_OPERASIONAL AS BELANJA_PEGAWAI_OPERASIONAL,
    b.BELANJA_BARANG_OPERASIONAL AS BELANJA_BARANG_OPERASIONAL,
    b.BLNJ_BRG_NON_OP_NON_PEND AS BLNJ_BRG_NON_OP_NON_PEND,
    b.BLNJ_BRG_NON_OP_PHLN AS BLNJ_BRG_NON_OP_PHLN,
    b.BLNJ_BRG_NON_OP_SBSN AS BLNJ_BRG_NON_OP_SBSN,
    b.BELANJA_MODAL_OPERASIONAL AS BELANJA_MODAL_OPERASIONAL,
    b.BLNJ_MDL_NON_OP_NON_PEND AS BLNJ_MDL_NON_OP_NON_PEND,
    b.BLNJ_MDL_NON_OP_PEND AS BLNJ_MDL_NON_OP_PEND,
    b.BLNJ_MDL_NON_OP_PHLN AS BLNJ_MDL_NON_OP_PHLN,
    b.BLNJ_MDL_NON_OP_SBSN AS BLNJ_MDL_NON_OP_SBSN,
    b.JUMLAH_TOTAL AS JUMLAH_TOTAL,
    b.BOLD AS BOLD,
    b.PERIODE AS PERIODE
    from
    (
        (
            (
                (
                    select
                        a.POK_UID AS POK_UID,
                        a.REV_UID AS REV_UID,
                        a.POK_REVISION_TYPE_UID AS POK_REVISION_TYPE_UID,
                        a.STATUS AS STATUS,
                        a.KODE_KEGIATAN AS KODE_KEGIATAN,
                        a.NAMA_KEGIATAN AS NAMA_KEGIATAN,
                        round(sum(a.SASARAN_VOLUME), 2) AS SASARAN_VOLUME,
                        a.SASARAN_SATUAN AS SASARAN_SATUAN,
                        round(sum(a.BELANJA_PEGAWAI_OPERASIONAL / 1000), 0) AS BELANJA_PEGAWAI_OPERASIONAL,
                        round(sum(a.BELANJA_BARANG_OPERASIONAL / 1000), 0) AS BELANJA_BARANG_OPERASIONAL,
                        round(sum(a.BLNJ_BRG_NON_OP_NON_PEND / 1000), 0) AS BLNJ_BRG_NON_OP_NON_PEND,
                        round(sum(a.BLNJ_BRG_NON_OP_PEND / 1000), 0) AS BLNJ_BRG_NON_OP_PEND,
                        round(sum(a.BLNJ_BRG_NON_OP_PHLN / 1000), 0) AS BLNJ_BRG_NON_OP_PHLN,
                        round(sum(a.BLNJ_BRG_NON_OP_SBSN / 1000), 0) AS BLNJ_BRG_NON_OP_SBSN,
                        round(sum(a.BELANJA_MODAL_OPERASIONAL / 1000), 0) AS BELANJA_MODAL_OPERASIONAL,
                        round(sum(a.BLNJ_MDL_NON_OP_NON_PEND / 1000), 0) AS BLNJ_MDL_NON_OP_NON_PEND,
                        round(sum(a.BLNJ_MDL_NON_OP_PEND / 1000), 0) AS BLNJ_MDL_NON_OP_PEND,
                        round(sum(a.BLNJ_MDL_NON_OP_PHLN / 1000), 0) AS BLNJ_MDL_NON_OP_PHLN,
                        round(sum(a.BLNJ_MDL_NON_OP_SBSN / 1000), 0) AS BLNJ_MDL_NON_OP_SBSN,
                        case
                            when a.KODE_KEGIATAN like '%994' then round(sum(a.JUMLAH_TOTAL / 1000 / 2), 0)
                            when a.KODE_KEGIATAN = '06.2409.FS.RDC.003' then round(sum(a.JUMLAH_TOTAL / 1000 / 2), 0)
                            else round(sum(a.JUMLAH_TOTAL / 1000), 0) 
                            - round(sum(a.BLNJ_BRG_NON_OP_NON_PEND / 1000) 
                            + round(sum(a.BLNJ_MDL_NON_OP_NON_PEND / 1000),0),0)
                        end AS JUMLAH_TOTAL,
                        a.BOLD AS BOLD,
                        a.PERIODE AS PERIODE,
                        a.STATUS_DATA AS STATUS_DATA
                    from
                        pok_online.v_1_rencana_kerja a
                    group by
                        a.POK_UID,
                        a.STATUS_DATA,
                        a.KODE_KEGIATAN
                )
            ) b
            join (
                select
                    v_1_rencana_kerja.POK_UID AS POK_UID,
                    v_1_rencana_kerja.STATUS_DATA AS STATUS_DATA,
                    v_1_rencana_kerja.KODE_KEGIATAN AS KODE_KEGIATAN,
                    v_1_rencana_kerja.NAMA_KEGIATAN AS NAMA_KEGIATAN,
                    v_1_rencana_kerja.SASARAN_VOLUME AS SASARAN_VOLUME,
                    v_1_rencana_kerja.SASARAN_SATUAN AS SASARAN_SATUAN
                from
                    pok_online.v_1_rencana_kerja
                where
                    v_1_rencana_kerja.NOITEM1 = '0'
            ) c
        )
        join (
            select
                v_1_rencana_kerja.POK_UID AS POK_UID,
                v_1_rencana_kerja.STATUS_DATA AS STATUS_DATA,
                v_1_rencana_kerja.KODE_KEGIATAN AS KODE_KEGIATAN,
                v_1_rencana_kerja.NAMA_KEGIATAN AS NAMA_KEGIATAN,
                format(sum(v_1_rencana_kerja.SASARAN_VOLUME), 2) AS SASARAN_VOLUME,
                v_1_rencana_kerja.SASARAN_SATUAN AS SASARAN_SATUAN,
                v_1_rencana_kerja.NOITEM1 AS NOITEM1,
                v_1_rencana_kerja.LVL AS LVL
            from
                pok_online.v_1_rencana_kerja
            where
                concat(
                    v_1_rencana_kerja.LVL,
                    v_1_rencana_kerja.NOITEM1
                ) <> '050'
            group by
                v_1_rencana_kerja.POK_UID,
                v_1_rencana_kerja.STATUS_DATA,
                v_1_rencana_kerja.KODE_KEGIATAN
        ) d
    )
    where
    b.POK_UID = c.POK_UID
    and b.POK_UID = d.POK_UID
    and b.STATUS_DATA = c.STATUS_DATA
    and b.STATUS_DATA = d.STATUS_DATA
    and b.KODE_KEGIATAN = c.KODE_KEGIATAN
    and b.KODE_KEGIATAN = d.KODE_KEGIATAN
    and b.REV_UID = '${revUid}'
    group by
    b.POK_UID,
    b.KODE_KEGIATAN,
    b.STATUS_DATA
    order by
    b.POK_UID,
    b.KODE_KEGIATAN,
    b.STATUS_DATA`
    return query
}

const strukturKegiatan1 = (revUid) => {
    return `select
    b.POK_UID AS POK_UID,
    b.REV_UID AS REV_UID,
    b.STATUS AS STATUS,
    b.KDPPK1 AS KDPPK1,
    b.STATUS_DATA AS STATUS_DATA,
    b.KODE_KEGIATAN AS KODE_KEGIATAN,
    c.NAMA_KEGIATAN AS NAMA_KEGIATAN,
    d.SASARAN_VOLUME AS SASARAN_VOLUME,
    c.SASARAN_SATUAN AS SASARAN_SATUAN,
    b.BELANJA_PEGAWAI_OPERASIONAL AS BELANJA_PEGAWAI_OPERASIONAL,
    b.BELANJA_BARANG_OPERASIONAL AS BELANJA_BARANG_OPERASIONAL,
    b.BLNJ_BRG_NON_OP_NON_PEND AS BLNJ_BRG_NON_OP_NON_PEND,
    b.BLNJ_BRG_NON_OP_PHLN AS BLNJ_BRG_NON_OP_PHLN,
    b.BLNJ_BRG_NON_OP_SBSN AS BLNJ_BRG_NON_OP_SBSN,
    b.BELANJA_MODAL_OPERASIONAL AS BELANJA_MODAL_OPERASIONAL,
    b.BLNJ_MDL_NON_OP_NON_PEND AS BLNJ_MDL_NON_OP_NON_PEND,
    b.BLNJ_MDL_NON_OP_PEND AS BLNJ_MDL_NON_OP_PEND,
    b.BLNJ_MDL_NON_OP_PHLN AS BLNJ_MDL_NON_OP_PHLN,
    b.BLNJ_MDL_NON_OP_SBSN AS BLNJ_MDL_NON_OP_SBSN,
    b.JUMLAH_TOTAL AS JUMLAH_TOTAL,
    b.BOLD AS BOLD,
    b.PERIODE AS PERIODE
from
    ((((
    select
        a.POK_UID AS POK_UID,
        a.REV_UID AS REV_UID,
        a.STATUS_DATA AS STATUS_DATA,
        a.KDPPK1 AS KDPPK1,
        a.STATUS AS STATUS,
        a.NOITEM1 AS NOITEM1,
        a.LVL AS LVL,
        a.KODE_KEGIATAN AS KODE_KEGIATAN,
        a.NAMA_KEGIATAN AS NAMA_KEGIATAN,
        round(sum(a.SASARAN_VOLUME), 2) AS SASARAN_VOLUME,
        a.SASARAN_SATUAN AS SASARAN_SATUAN,
        round(sum(a.BELANJA_PEGAWAI_OPERASIONAL / 1000), 0) AS BELANJA_PEGAWAI_OPERASIONAL,
        round(sum(a.BELANJA_BARANG_OPERASIONAL / 1000), 0) AS BELANJA_BARANG_OPERASIONAL,
        round(sum(a.BLNJ_BRG_NON_OP_NON_PEND / 1000), 0) AS BLNJ_BRG_NON_OP_NON_PEND,
        round(sum(a.BLNJ_BRG_NON_OP_PEND / 1000), 0) AS BLNJ_BRG_NON_OP_PEND,
        round(sum(a.BLNJ_BRG_NON_OP_PHLN / 1000), 0) AS BLNJ_BRG_NON_OP_PHLN,
        round(sum(a.BLNJ_BRG_NON_OP_SBSN / 1000), 0) AS BLNJ_BRG_NON_OP_SBSN,
        round(sum(a.BELANJA_MODAL_OPERASIONAL / 1000), 0) AS BELANJA_MODAL_OPERASIONAL,
        round(sum(a.BLNJ_MDL_NON_OP_NON_PEND / 1000), 0) AS BLNJ_MDL_NON_OP_NON_PEND,
        round(sum(a.BLNJ_MDL_NON_OP_PEND / 1000), 0) AS BLNJ_MDL_NON_OP_PEND,
        round(sum(a.BLNJ_MDL_NON_OP_PHLN / 1000), 0) AS BLNJ_MDL_NON_OP_PHLN,
        round(sum(a.BLNJ_MDL_NON_OP_SBSN / 1000), 0) AS BLNJ_MDL_NON_OP_SBSN,
        round(sum(a.JUMLAH_TOTAL / 1000), 0) AS JUMLAH_TOTAL,
        a.BOLD AS BOLD,
        a.PERIODE AS PERIODE
    from
        pok_online.v_2_struktur_kegiatan a
    group by
        a.POK_UID,
        a.STATUS_DATA,
        a.KODE_KEGIATAN)) b
join (
    select
        v_2_struktur_kegiatan.POK_UID AS POK_UID,
        v_2_struktur_kegiatan.STATUS_DATA AS STATUS_DATA,
        v_2_struktur_kegiatan.KODE_KEGIATAN AS KODE_KEGIATAN,
        v_2_struktur_kegiatan.NAMA_KEGIATAN AS NAMA_KEGIATAN,
        v_2_struktur_kegiatan.SASARAN_VOLUME AS SASARAN_VOLUME,
        v_2_struktur_kegiatan.SASARAN_SATUAN AS SASARAN_SATUAN
    from
        pok_online.v_2_struktur_kegiatan
    where
        v_2_struktur_kegiatan.NOITEM1 = '0') c)
join (
    select
        v_2_struktur_kegiatan.POK_UID AS POK_UID,
        v_2_struktur_kegiatan.STATUS_DATA AS STATUS_DATA,
        v_2_struktur_kegiatan.KODE_KEGIATAN AS KODE_KEGIATAN,
        v_2_struktur_kegiatan.NAMA_KEGIATAN AS NAMA_KEGIATAN,
        round(sum(v_2_struktur_kegiatan.SASARAN_VOLUME), 2) AS SASARAN_VOLUME,
        v_2_struktur_kegiatan.SASARAN_SATUAN AS SASARAN_SATUAN,
        v_2_struktur_kegiatan.NOITEM1 AS NOITEM1,
        v_2_struktur_kegiatan.LVL AS LVL
    from
        pok_online.v_2_struktur_kegiatan
    where
        concat(v_2_struktur_kegiatan.LVL, v_2_struktur_kegiatan.NOITEM1) <> '050'
    group by
        v_2_struktur_kegiatan.POK_UID,
        v_2_struktur_kegiatan.STATUS_DATA,
        v_2_struktur_kegiatan.KODE_KEGIATAN) d)
where
    b.POK_UID = c.POK_UID
    and b.POK_UID = d.POK_UID
    and b.STATUS_DATA = c.STATUS_DATA
    and b.STATUS_DATA = d.STATUS_DATA
    and b.KODE_KEGIATAN = c.KODE_KEGIATAN
    and b.KODE_KEGIATAN = d.KODE_KEGIATAN
    and b.REV_UID ='${revUid}'
group by
    b.POK_UID,
    b.KODE_KEGIATAN,
    b.STATUS_DATA`
}

const lembarKontrolPenRo = (revUid) => {
    const query = `select
    rev.POK_UID AS POK_UID,
    dpo.D_POK_REVISION_UID AS D_POK_REVISION_UID,
    max(dpo.STATUS) AS STATUS,
    dpo.KDSATKER AS KDSATKER,
    concat(dpo.KDOUTPUT, '.', dpo.KDSOUTPUT, ' - ', sout.NMSOUTPUT) AS NAMA_RINCIAN_OUTPUT,
    ucase(do.SAT) AS SATUAN,
    case
        when ds.PERIODE = 0 then ifnull(SAPSK_VOL.VAL, 0)
        else ifnull(AKHIR0_VOL.VAL, 0)
    end AS AWAL_VOL,
    case
        when ds.PERIODE = 0 then ifnull(SAPSK_RPM.VAL, 0)
        else ifnull(AKHIR0_RPM.VAL, 0)
    end AS AWAL_RPM,
    case
        when ds.PERIODE = 0 then ifnull(SAPSK_PHLN.VAL, 0)
        else ifnull(AKHIR0_PHLN.VAL, 0)
    end AS AWAL_PHLN,
    case
        when ds.PERIODE = 0 then ifnull(SAPSK_BLOKIR.VAL, 0)
        else ifnull(AKHIR0_BLOKIR.VAL, 0)
    end AS AWAL_BLOKIR,
    case
        when ds.PERIODE = 0 then ifnull(SAPSK_SBSN.VAL, 0)
        else ifnull(AKHIR0_SBSN.VAL, 0)
    end AS AWAL_SBSN,
    case
        when ds.PERIODE = 0 then ifnull(SAPSK_RPM.VAL, 0) + ifnull(SAPSK_PHLN.VAL, 0) + ifnull(SAPSK_BLOKIR.VAL, 0) + ifnull(SAPSK_SBSN.VAL, 0)
        else ifnull(AKHIR0_RPM.VAL, 0) + ifnull(AKHIR0_PHLN.VAL, 0) + ifnull(AKHIR0_BLOKIR.VAL, 0) + ifnull(AKHIR0_SBSN.VAL, 0)
    end AS AWAL_JUMLAH,
    case
        when ds.PERIODE = 2 then ifnull(AKHIR1_VOL.VAL, 0)
        when ds.PERIODE = 1 then ifnull(AKHIR_VOL.VAL, 0)
        else NULL
    end AS REVISI_1_VOL,
    case
        when ds.PERIODE = 2 then ifnull(AKHIR1_RPM.VAL, 0)
        when ds.PERIODE = 1 then ifnull(AKHIR_RPM.VAL, 0)
        else NULL
    end AS REVISI_1_RPM,
    case
        when ds.PERIODE = 2 then ifnull(AKHIR1_PHLN.VAL, 0)
        when ds.PERIODE = 1 then ifnull(AKHIR_PHLN.VAL, 0)
        else NULL
    end AS REVISI_1_PHLN,
    case
        when ds.PERIODE = 2 then ifnull(AKHIR1_BLOKIR.VAL, 0)
        when ds.PERIODE = 1 then ifnull(AKHIR_BLOKIR.VAL, 0)
        else NULL
    end AS REVISI_1_BLOKIR,
    case
        when ds.PERIODE = 2 then ifnull(AKHIR1_SBSN.VAL, 0)
        when ds.PERIODE = 1 then ifnull(AKHIR_SBSN.VAL, 0)
        else NULL
    end AS REVISI_1_SBSN,
    case
        when ds.PERIODE = 2 then ifnull(AKHIR1_RPM.VAL, 0) + ifnull(AKHIR1_PHLN.VAL, 0) + ifnull(AKHIR1_BLOKIR.VAL, 0) + ifnull(AKHIR1_SBSN.VAL, 0)
        when ds.PERIODE = 1 then ifnull(AKHIR_RPM.VAL, 0) + ifnull(AKHIR_PHLN.VAL, 0) + ifnull(AKHIR_BLOKIR.VAL, 0) + ifnull(AKHIR_SBSN.VAL, 0)
        else NULL
    end AS REVISI_1_JUMLAH,
    case
        when ds.PERIODE in (0, 2) then ifnull(AKHIR_VOL.VAL, 0)
        else NULL
    end AS AKHIR_VOL,
    case
        when ds.PERIODE in (0, 2) then ifnull(AKHIR_RPM.VAL, 0)
        else NULL
    end AS AKHIR_RPM,
    case
        when ds.PERIODE in (0, 2) then ifnull(AKHIR_PHLN.VAL, 0)
        else NULL
    end AS AKHIR_PHLN,
    case
        when ds.PERIODE in (0, 2) then ifnull(AKHIR_BLOKIR.VAL, 0)
        else NULL
    end AS AKHIR_BLOKIR,
    case
        when ds.PERIODE in (0, 2) then ifnull(AKHIR_SBSN.VAL, 0)
        else NULL
    end AS AKHIR_SBSN,
    case
        when ds.PERIODE in (0, 2) then ifnull(AKHIR_RPM.VAL, 0) + ifnull(AKHIR_PHLN.VAL, 0) + ifnull(AKHIR_BLOKIR.VAL, 0) + ifnull(AKHIR_SBSN.VAL, 0)
        else NULL
    end AS AKHIR_JUMLAH,
    dpo.KET AS KETERANGAN,
    ds.PERIODE AS PERIODE
from
    ((((((((((((((((((((((((pok_online.dbzd_po dpo
left join (
    select
        concat(sat.KDSATKER, sat.THANG, sat.KDOUTPUT, '.', sat.KDSOUTPUT) AS IDENTIFIER,
        round(sum(sat.VOLKEG), 2) AS VAL,
        ucase(sat.SATKEG) AS SATKEG
    from
        pok_online.tr_satuan_3 sat
    where
        sat.KDJNSBAN = '0'
        AND sat.SATKEG in ('KM','M','DOKUMEN','LAYANAN')
    group by
        concat(sat.KDOUTPUT, '.', sat.KDSOUTPUT),
        sat.KDSATKER,
        sat.THANG) SAPSK_VOL on
    (SAPSK_VOL.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and dpo.STATUS = 0
        and SAPSK_VOL.SATKEG = dpo.SATKEG))
left join (
    select
        concat(sat.KDSATKER, sat.THANG, sat.KDOUTPUT, '.', sat.KDSOUTPUT) AS IDENTIFIER,
        round(sum(sat.JMLIKAT + sat.JMLPDP + sat.JMLNPDP + sat.JMLHIBAH - (sat.RPHBLOKIR + sat.BLOKIRRMP + sat.BLOKIRRKP)), 0) AS VAL
    from
        pok_online.tr_satuan_3 sat
    where
        sat.KDBEBAN <> 'K'
        and sat.KDJNSBAN = '0'
    group by
        concat(sat.KDOUTPUT, '.', sat.KDSOUTPUT),
        sat.KDSATKER,
        sat.THANG) SAPSK_RPM on
    (SAPSK_RPM.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and dpo.STATUS = 0))
left join (
    select
        concat(sat.KDSATKER, sat.THANG, sat.KDOUTPUT, '.', sat.KDSOUTPUT) AS IDENTIFIER,
        round(sum(sat.JMLIKAT + sat.JMLPDP + sat.JMLNPDP + sat.JMLHIBAH - (sat.RPHBLOKIR + sat.BLOKIRRMP + sat.BLOKIRRKP)), 0) AS VAL
    from
        pok_online.tr_satuan_3 sat
    where
        left(sat.KDAKUN,
        2) in ('52', '53')
            and sat.KDBEBAN = 'K'
            and sat.KDJNSBAN = '0'
        group by
            concat(sat.KDOUTPUT, '.', sat.KDSOUTPUT),
            sat.KDSATKER,
            sat.THANG) SAPSK_SBSN on
    (SAPSK_SBSN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and dpo.STATUS = 0))
left join (
    select
        concat(sat.KDSATKER, sat.THANG, sat.KDOUTPUT, '.', sat.KDSOUTPUT) AS IDENTIFIER,
        round(sum(sat.JMLPLN), 0) AS VAL
    from
        pok_online.tr_satuan_3 sat
    where
        sat.KDBEBAN <> 'K'
        and sat.KDJNSBAN IS NOT NULL
    group by
        concat(sat.KDOUTPUT, '.', sat.KDSOUTPUT),
        sat.KDSATKER,
        sat.THANG) SAPSK_PHLN on
    (SAPSK_PHLN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and dpo.STATUS = 0))
left join (
    select
        concat(sat.KDSATKER, sat.THANG, sat.KDOUTPUT, '.', sat.KDSOUTPUT) AS IDENTIFIER,
        round(sum(sat.RPHBLOKIR + sat.BLOKIRRMP + sat.BLOKIRRKP + sat.BLOKIRPHLN), 0) AS VAL
    from
        pok_online.tr_satuan_3 sat
    group by
        concat(sat.KDOUTPUT, '.', sat.KDSOUTPUT),
        sat.KDSATKER,
        sat.THANG) SAPSK_BLOKIR on
    (SAPSK_BLOKIR.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and dpo.STATUS = 0))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.VOLKEG1), 2) AS VAL
    from
        pok_online.dbzd_po po
    where
        po.STATUS = 0
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR0_VOL on
    (AKHIR0_VOL.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLIKAT + po.JMLPDP + po.JMLNPDP + po.JMLHIBAH - (po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP)) / 1000, 0) AS VAL
    from
        pok_online.dbzd_po po
    where
        po.KDBEBAN <> 'K'
        and po.KDJNSBAN = '0'
        and po.STATUS = 0
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR0_RPM on
    (AKHIR0_RPM.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLIKAT + po.JMLPDP + po.JMLNPDP + po.JMLHIBAH - (po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP)) / 1000, 0) AS VAL
    from
        pok_online.dbzd_po po
    where
        left(po.KDAKUN,
        2) in ('52', '53')
            and po.KDBEBAN = 'K'
            and po.KDJNSBAN = '0'
            and po.STATUS = 0
        group by
            concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
            po.KDSATKER,
            po.THANG,
            po.D_POK_REVISION_UID) AKHIR0_SBSN on
    (AKHIR0_SBSN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLPLN) / 1000, 0) AS VAL
    from
        pok_online.dbzd_po po
    where
        po.KDBEBAN <> 'K'
        and po.KDJNSBAN = '0'
        and po.STATUS = 0
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR0_PHLN on
    (AKHIR0_PHLN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP + po.BLOKIRPHLN) / 1000, 0) AS VAL
    from
        pok_online.dbzd_po po
    where
        po.STATUS = 0
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR0_BLOKIR on
    (AKHIR0_BLOKIR.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.VOLKEG1), 2) AS VAL
    from
        (pok_online.dbzd_po po
    left join pok_online.v_periode_2 per on
        (per.D_POK_REVISION_UID = po.D_POK_REVISION_UID))
    where
        po.STATUS = per.DS_STATUS
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR1_VOL on
    (AKHIR1_VOL.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLIKAT + po.JMLPDP + po.JMLNPDP + po.JMLHIBAH - (po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP)) / 1000, 0) AS VAL
    from
        (pok_online.dbzd_po po
    left join pok_online.v_periode_2 per on
        (per.D_POK_REVISION_UID = po.D_POK_REVISION_UID))
    where
        po.STATUS = per.DS_STATUS
        and po.KDBEBAN <> 'K'
        and po.KDJNSBAN = '0'
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR1_RPM on
    (AKHIR1_RPM.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLIKAT + po.JMLPDP + po.JMLNPDP + po.JMLHIBAH - (po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP)) / 1000, 0) AS VAL
    from
        (pok_online.dbzd_po po
    left join pok_online.v_periode_2 per on
        (per.D_POK_REVISION_UID = po.D_POK_REVISION_UID))
    where
        po.STATUS = per.DS_STATUS
        and left(po.KDAKUN,
        2) in ('52', '53')
            and po.KDBEBAN = 'K'
            and po.KDJNSBAN = '0'
        group by
            concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
            po.KDSATKER,
            po.THANG,
            po.D_POK_REVISION_UID) AKHIR1_SBSN on
    (AKHIR1_SBSN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLPLN) / 1000, 0) AS VAL
    from
        (pok_online.dbzd_po po
    left join pok_online.v_periode_2 per on
        (per.D_POK_REVISION_UID = po.D_POK_REVISION_UID))
    where
        po.STATUS = per.DS_STATUS
        and po.KDBEBAN <> 'K'
        and po.KDJNSBAN = '0'
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR1_PHLN on
    (AKHIR1_PHLN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP + po.BLOKIRPHLN) / 1000, 0) AS VAL
    from
        (pok_online.dbzd_po po
    left join pok_online.v_periode_2 per on
        (per.D_POK_REVISION_UID = po.D_POK_REVISION_UID))
    where
        po.STATUS = per.DS_STATUS
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID) AKHIR1_BLOKIR on
    (AKHIR1_BLOKIR.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.VOLKEG1), 2) AS VAL,
        max(po.STATUS) AS STATUS,
        po.D_POK_REVISION_UID AS D_POK_REVISION_UID,
        po.KDSATKER AS KDSATKER
    from
        pok_online.dbzd_po po
    where
        po.VOLKEG1 is not null
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID,
        po.STATUS) AKHIR_VOL on
    (AKHIR_VOL.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and AKHIR_VOL.STATUS = dpo.STATUS))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLIKAT + po.JMLPDP + po.JMLNPDP + po.JMLHIBAH - (po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP)) / 1000, 0) AS VAL,
        max(po.STATUS) AS STATUS,
        po.D_POK_REVISION_UID AS D_POK_REVISION_UID,
        po.KDSATKER AS KDSATKER
    from
        pok_online.dbzd_po po
    where
        po.KDBEBAN <> 'K'
        and po.KDJNSBAN = '0'
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID,
        po.STATUS) AKHIR_RPM on
    (AKHIR_RPM.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and AKHIR_RPM.STATUS = dpo.STATUS))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLIKAT + po.JMLPDP + po.JMLNPDP + po.JMLHIBAH - (po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP)) / 1000, 0) AS VAL,
        max(po.STATUS) AS STATUS,
        po.D_POK_REVISION_UID AS D_POK_REVISION_UID,
        po.KDSATKER AS KDSATKER
    from
        pok_online.dbzd_po po
    where
        left(po.KDAKUN,
        2) in ('52', '53')
            and po.KDBEBAN = 'K'
            and po.KDJNSBAN = '0'
        group by
            concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
            po.KDSATKER,
            po.THANG,
            po.D_POK_REVISION_UID,
            po.STATUS) AKHIR_SBSN on
    (AKHIR_SBSN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and AKHIR_SBSN.STATUS = dpo.STATUS))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.JMLPLN) / 1000, 0) AS VAL,
        max(po.STATUS) AS STATUS,
        po.D_POK_REVISION_UID AS D_POK_REVISION_UID,
        po.KDSATKER AS KDSATKER
    from
        pok_online.dbzd_po po
    where
        po.KDBEBAN <> 'K'
        and po.KDJNSBAN IS NOT NULL
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID,
        po.STATUS) AKHIR_PHLN on
    (AKHIR_PHLN.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and AKHIR_PHLN.STATUS = dpo.STATUS))
left join (
    select
        concat(po.KDSATKER, po.THANG, po.KDOUTPUT, '.', po.KDSOUTPUT) AS IDENTIFIER,
        round(sum(po.RPHBLOKIR + po.BLOKIRRMP + po.BLOKIRRKP + po.BLOKIRPHLN) / 1000, 0) AS VAL,
        max(po.STATUS) AS STATUS,
        po.D_POK_REVISION_UID AS D_POK_REVISION_UID,
        po.KDSATKER AS KDSATKER
    from
        pok_online.dbzd_po po
    where
        po.VOLKEG1 is not null
    group by
        concat(po.KDOUTPUT, '.', po.KDSOUTPUT),
        po.KDSATKER,
        po.THANG,
        po.D_POK_REVISION_UID,
        po.STATUS) AKHIR_BLOKIR on
    (AKHIR_BLOKIR.IDENTIFIER = concat(dpo.KDSATKER, dpo.THANG, dpo.KDOUTPUT, '.', dpo.KDSOUTPUT)
        and AKHIR_BLOKIR.STATUS = dpo.STATUS))
left join pok_online.t_soutput sout on
    (sout.THANG = dpo.THANG
        and sout.KDPROGRAM = dpo.KDPROGRAM1
        and sout.KDGIAT = dpo.KDGIAT1
        and sout.KDOUTPUT = dpo.KDOUTPUT1
        and sout.KDSOUTPUT = dpo.KDSOUTPUT1))
left join pok_online.d_pok_revision rev on
    (rev.UID = dpo.D_POK_REVISION_UID))
left join pok_online.dbzt_output do on
    (do.KDOUTPUT = dpo.KDOUTPUT))
left join pok_online.dbzd_ds ds on
    (ds.KDSATKER = dpo.KDSATKER
        and ds.THANG = dpo.THANG
        and ds.D_POK_REVISION_UID = dpo.D_POK_REVISION_UID
        and ds.STATUS = dpo.STATUS))
where
    dpo.KDSATKER is not null
    and concat(dpo.KDOUTPUT, '.', dpo.KDSOUTPUT, ' - ', sout.NMSOUTPUT) is not null
    and dpo.D_POK_REVISION_UID = '${revUid}'
group by
    dpo.KDSATKER,
    dpo.THANG,
    concat(dpo.KDOUTPUT, '.', dpo.KDSOUTPUT, ' - ', sout.NMSOUTPUT),
    ds.PERIODE
order by
    dpo.KDSATKER,
    dpo.THANG,
    dpo.STATUS,
    concat(dpo.KDOUTPUT, '.', dpo.KDSOUTPUT, ' - ', sout.NMSOUTPUT)`
    return query
}

const getDataLembarKontrol1 = (viewName, revUid) => {
    let sql = `select  POK_UID, D_POK_REVISION_UID, STATUS, KDSATKER, NMSATKER, NMLOKASI, PROGRAM, NO_TGL_SP_DIPA, 
    THANG, NAMA_RINCIAN_OUTPUT, NOMOR, AWAL_BLNJ_PEG_OP, AWAL_BRG_RM, AWAL_BRG_NON_OPR, 
    AWAL_BRG_SBSN, AWAL_MDL_RM, AWAL_MDL_NON_OPR, AWAL_MDL_SBSN, AWAL_JUMLAH, 
    REVISI_1_BLNJ_PEG_OP, REVISI_1_BRG_RM, REVISI_1_BRG_NON_OPR, 
    REVISI_1_BRG_SBSN, REVISI_1_MDL_RM, REVISI_1_MDL_NON_OPR, 
    REVISI_1_MDL_SBSN, REVISI_1_JUMLAH, AKHIR_BLNJ_PEG_OP, AKHIR_BRG_RM, 
    AKHIR_BRG_NON_OPR, AKHIR_BRG_SBSN, AKHIR_MDL_RM, AKHIR_MDL_NON_OPR, 
    AKHIR_MDL_SBSN, AKHIR_JUMLAH, KETERANGAN, SORT, PERIODE 
    FROM ${viewName} where D_POK_REVISION_UID = '${revUid}'`
    return sql
}

const getDataLingkupKegiatan = (revUid) => {
    return `select * from v_3_lingkup_kegiatan where REV_UID = '${revUid}'`
}

const getDataLingkupKegiatanHdr = (revUid) => {
    return `select
        KODE_KEGIATAN 
    from
        v_3_lingkup_kegiatan
    where
        REV_UID = '${revUid}'
    AND LENGTH (KODE_KEGIATAN) = 2 
    order by KODE_KEGIATAN ASC`
}

const getDataLingkupKegiatanDtl = (revUid, kodeKegiatan) => {
    return `select
        * 
    from
        v_3_lingkup_kegiatan
    where
        REV_UID = '${revUid}'
        and KODE_KEGIATAN like '${kodeKegiatan}%'
        order by KODE_KEGIATAN ASC`
}

const getDataLingkupKegiatanSubTotal = (revUid, kodeKegiatan) => {
    return `select
    UID,
    POK_UID,
    REV_UID,
    STATUS,
    STATUS_DATA,
    NULL AS LVL,
    NULL AS KODE_KEGIATAN,
    'Sub Total Pelaksanaan Kegiatan' AS NAMA_KEGIATAN,
    NULL AS LOKASI_KEGIATAN ,
    NULL AS SUMBER_DANA ,
    SUM(ALOKASI_DANA) AS ALOKASI_DANA,
    SUM(SASARAN_VOLUME_SNF) AS SASARAN_VOLUME_SNF,
    NULL AS SASARAN_VOLUME ,
    NULL AS SASARAN_SATUAN ,
    NULL AS NOMOR_RUAS ,
    NULL AS PANJANG_RUAS ,
    NULL AS STS_JALAN ,
    NULL AS INDIKASI_LOKASI_NAMA_JEMBATAN ,
    NULL AS KOORDINAT_X_AWAL,
    NULL AS KOORDINAT_X_AKHIR,
    NULL AS KOORDINAT_Y_AWAL,
    NULL AS KOORDINAT_Y_AKHIR ,
    NULL AS PANJANG_PENANGANAN ,
    NULL AS LEBAR_PENANGANAN,
    NULL AS JENIS_PENANGANAN ,
    NULL AS KET_REVISI ,
    NULL AS BOLD,
    NULL AS PERIODE
    from
        v_3_lingkup_kegiatan
    where
        REV_UID = '${revUid}'
        and KODE_KEGIATAN like '${kodeKegiatan}%'
        and LVL = '04'`
}

const getDataLingkupKegiatanGrandTotal = (revUid, nmSatker) => {
    return `
    select
    UID,
    POK_UID,
    REV_UID,
    STATUS,
    STATUS_DATA,
    NULL AS LVL,
    NULL AS KODE_KEGIATAN,
    'TOTAL ${nmSatker}' AS NAMA_KEGIATAN,
    NULL AS LOKASI_KEGIATAN ,
    NULL AS SUMBER_DANA ,
    SUM(ALOKASI_DANA) AS ALOKASI_DANA,
    SUM(SASARAN_VOLUME_SNF) AS SASARAN_VOLUME_SNF,
    NULL AS SASARAN_VOLUME ,
    NULL AS SASARAN_SATUAN ,
    NULL AS NOMOR_RUAS ,
    NULL AS PANJANG_RUAS ,
    NULL AS STS_JALAN ,
    NULL AS INDIKASI_LOKASI_NAMA_JEMBATAN ,
    NULL AS KOORDINAT_X_AWAL,
    NULL AS KOORDINAT_X_AKHIR,
    NULL AS KOORDINAT_Y_AWAL,
    NULL AS KOORDINAT_Y_AKHIR ,
    NULL AS PANJANG_PENANGANAN ,
    NULL AS LEBAR_PENANGANAN,
    NULL AS JENIS_PENANGANAN ,
    NULL AS KET_REVISI ,
    NULL AS BOLD,
    NULL AS PERIODE
    from
        temp_lingkup_kegiatan a
    where
        REV_UID = '${revUid}'
        and KODE_KEGIATAN is null`
}

const getDataRincianKegiatanHdr = (revUid) => {
    return `SELECT
        UID,
        POK_UID,
        REV_UID,
        STATUS,
        STATUS_DATA,
        LVL,
        KODE_KEGIATAN,
        NOITEM1,
        NAMA_KEGIATAN,
        VOLUME_KEGIATAN,
        SATUAN,
        JUMLAH_BIAYA,
        SUMBER_DANA,
        CARA_BAYAR,
        JENIS_KONTRAK,
        KET,
        BOLD,
        PERIODE
    FROM
        pok_online.v_5_rincian_kegiatan
    WHERE
        REV_UID  = '${revUid}'`
}

const getSumDataRincianKegiatanDtl = (revUid, kodeKegiatan) => {
    return `select
        SUM(JUMLAH_BIAYA) as TOTAL_JUMLAH_BIAYA
    from
        v_5_rincian_kegiatan
    where
        REV_UID = '${revUid}'
        and KODE_KEGIATAN LIKE '${kodeKegiatan}%'`
}

const getGrandTotalRincianKegiatan = (revUid) => {
    return `select
        null as ID,
        a.UID,
        a.POK_UID,
        a.REV_UID,
        'AWAL' as STATUS,
        '0' as STATUS_DATA,
        '10' as LVL,
        null as KODE_KEGIATAN ,
        '0' as NOITEM1,
        concat('TOTAL PELAKSANAAN ', c.NMSATKER) AS NAMA_KEGIATAN,
        null as VOLUME_KEGIATAN ,
        'KM' as SATUAN ,
        SUM(a.JUMLAH_BIAYA) AS JUMLAH_BIAYA,
        null as SUMBER_DANA ,
        '020' as CARA_BAYAR ,
        null as JENIS_KONTRAK ,
        null as KET,
        'Y' as BOLD,
        '0' as PERIODE
    from
        temp_rincian_kegiatan a
        join d_pok b on a.POK_UID = b.UID 
        join dbzt_satker c on c.UID = b.SATKER_UID 
    WHERE
        a.REV_UID = '${revUid}'
    AND LENGTH(KODE_KEGIATAN) = '2'`
}

export {
    getDataLembarKontrol1,
    rencanaKerja1,
    strukturKegiatan1,
    lembarKontrolPenRo,
    getDataLingkupKegiatan,
    getDataLingkupKegiatanHdr,
    getDataLingkupKegiatanDtl,
    getDataLingkupKegiatanSubTotal,
    getDataLingkupKegiatanGrandTotal,
    getDataRincianKegiatanHdr,
    getSumDataRincianKegiatanDtl,
    getGrandTotalRincianKegiatan
}