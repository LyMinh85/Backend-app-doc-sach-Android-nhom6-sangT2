export enum NgayDangSort {
  asc = 'asc',
  desc = 'desc',
}

export interface SachQueryParams {
  TenSach?: string;
  NhaXuatBan?: string;
  idNguoiDung?: string;
  ngayDang?: NgayDangSort;
  xemNhieuNhat?: boolean;
}
