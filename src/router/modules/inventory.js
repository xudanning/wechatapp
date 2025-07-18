// src/router/modules/inventory.js
export default [
  {
    path: '/inventory',
    name: 'Inventory',
    redirect: '/inventory/warehouse',
    meta: {
      title: '库存管理',
      icon: 'warehouse-o',
      requiresAuth: true
    },
    children: [
      {
        path: 'warehouse',
        name: 'WarehouseList',
		component: () => import('@/views/inventory/WarehousePage.vue'),
        meta: {
          title: '仓库管理',
          icon: 'home-o',
          requiresAuth: true
        }
      },
      {
        path: 'warehouse/create',
        name: 'WarehouseCreate',
        component: () => import('@/views/inventory/WarehouseForm.vue'),
        meta: {
          title: '新增仓库',
          hidden: true,
          requiresAuth: true
        }
      },
      {
        path: 'warehouse/edit/:id',
        name: 'WarehouseEdit',
        component: () => import('@/views/inventory/WarehouseForm.vue'),
        meta: {
          title: '编辑仓库',
          hidden: true,
          requiresAuth: true
        }
      }
    ]
  }
]