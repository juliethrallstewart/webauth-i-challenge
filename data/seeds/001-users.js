
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'julieerin', password: 'chocolate', lastName: 'stewart', firstName: 'julie', phone: '5555555555', email: 'juliethrallstewart@gmail.com', address: '3315 S 12 St, tacoma, wa 98405'},
      ]);
    });
};
