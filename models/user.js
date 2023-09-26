import { Schema, model } from 'mongoose'

const UserSchema = Schema({
  name: { type: String, required: [true, 'Campo obligatorio'] },
  email: {
    type: String,
    required: [true, 'Campo obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Campo obligatorio']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true
    // enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}

export default model('User', UserSchema)
