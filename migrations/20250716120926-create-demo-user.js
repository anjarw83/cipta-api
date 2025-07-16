module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const demoUser = {
      name: "DemoUser",
      email: "demouser@mailinator.com",
      password: "demouserpassword"
    }
    await db.collection('users').insertOne(demoUser);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    const email = "demouser@mailinator.com";
    await db.collection('users').findOneAndDelete({email});
  }
};
