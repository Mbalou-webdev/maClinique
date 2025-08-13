import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://bahfatoumatambalou64:mbhass62880@cluster0.g79gbdo.mongodb.net/maClinique'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    console.log('✅ Connexion à MongoDB ');
  } catch (error) {
    console.error('❌ Échec de la connexion à MongoDB :', error.message);
    process.exit(1);
  }
};

export default connectDB;