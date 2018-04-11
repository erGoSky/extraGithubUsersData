import mongoose, { Schema } from 'mongoose'

const usersSchema = new Schema({
  UID: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

usersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      UID: this.UID,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Users', usersSchema)

export const schema = model.schema
export default model
