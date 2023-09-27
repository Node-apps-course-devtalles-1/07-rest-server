import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS)
    console.log('Data base on line')
  } catch (error) {
    console.log({ error })
    throw new Error('Error to connect data base !')
  }
}
