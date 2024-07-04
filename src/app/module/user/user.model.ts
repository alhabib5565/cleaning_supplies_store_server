import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>({
    userId: { type: String, required: [true, 'UserId is Required'], unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: Object.keys(USER_ROLE), default: 'Customer' },
    status: { type: String, enum: Object.keys(USER_STATUS), default: "Active" },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds))
    this.password = hashedPassword
    next()
})
export const User = model("User", userSchema)

