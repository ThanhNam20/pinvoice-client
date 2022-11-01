export const SIDEBAR_TITLE = [
  {
    title: "Quản lý hoá đơn",
    id: 1,
    items: [
      { title: "Danh sách hoá đơn", route: "/admin/manage-invoice" },
      { title: "Thêm hoá đơn", route: "/admin/add-invoice" },
    ],
  },
  {
    title: "Quản lý sản phẩm",
    id: 2,
    items: [
      { title: "Danh sách sản phẩm", route: "/admin/manage-product" },
      { title: "Thêm sản phẩm", route: "/admin/add-product" },
    ],
  },
];

export const PAGINATION = {
  LIMIT: 500,
  PAGE: 1
}
