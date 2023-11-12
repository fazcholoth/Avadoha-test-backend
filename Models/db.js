
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize( process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});





export async function syncDatabase() {
    try {
      await sequelize.sync({force:false});
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }
  

