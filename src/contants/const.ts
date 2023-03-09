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

export const STATIC_PAGE_SEO = {
  HOMEPAGE: {
    title: 'Pinvoice',
    description: 'Let go for create invoice',
    name: 'Hello from no where',
    type: 'HEHEHE'
  },
  LOGIN: {
    title: 'Login',
    description: 'Login',
    name: 'Login page',
    type: 'HHH'
  },
  REGISTER: {
    title: 'Register',
    description: 'Register',
    name: 'Register page',
    type: 'HHH'
  }
}
