import { POST, route, GET, PUT, before } from 'awilix-express'
import { Request, Response } from 'express'
import { FollowingService } from '../services/FollowingsService'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'

@route('/followings')
export class FollowingController {
    #followingService: FollowingService

    constructor ({ followingService }) {
        this.#followingService = followingService
      }
    
@POST()
async save (request: Request, response: Response) {
    const data = request.body
    const id = await this.#followingService.save(data)
    return response.status(201).json({ id })
}

@route('/:id')
@PUT()
@before([authMiddlewares])
async update (request: Request, response: Response){
    const data = request.body
    const { id } = request.params
    
    await this.#followingService.update(data, id)
    return response.status(201).json({ })
    
}

@GET()
@before([authMiddlewares])
async countFollowingPerUser(request: Request, response: Response){
    const { id_user } = request
    
    const totals = await this.#followingService.countFollowingsPerUser(id_user)
    return response.status(201).json({ totals})

}
}
