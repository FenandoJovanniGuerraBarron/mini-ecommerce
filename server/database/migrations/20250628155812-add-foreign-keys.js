'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Foreign key: orders.user_id -> users.id
    await queryInterface.addConstraint('orders', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_orders_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Foreign key: order_items.order_id -> orders.id
    await queryInterface.addConstraint('order_items', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_order_items_order_id',
      references: {
        table: 'orders',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Foreign key: order_items.product_id -> products.id
    await queryInterface.addConstraint('order_items', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_order_items_product_id',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove foreign keys in reverse order
    await queryInterface.removeConstraint('order_items', 'fk_order_items_product_id');
    await queryInterface.removeConstraint('order_items', 'fk_order_items_order_id');
    await queryInterface.removeConstraint('orders', 'fk_orders_user_id');
  }
};
