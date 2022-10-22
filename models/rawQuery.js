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

export {
    rencanaKerja1,
    strukturKegiatan1
}