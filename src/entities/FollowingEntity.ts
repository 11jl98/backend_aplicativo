import { randomUUID } from "crypto"

class FollowingEntity{
    id: string
    id_user: string
    id_following: string
    date: string

    constructor(body: Omit<FollowingEntity, 'id'>, id = randomUUID()){
        this.id = id
        this.id_user = body.id_user
        this.id_following = body.id_following
        this.date = body.date
    }
}

export { FollowingEntity }