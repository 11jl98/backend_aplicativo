import { POST, route, GET, before } from 'awilix-express'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { UploadImagesMiddlewares } from '../utils/middlewares/UploadImagesUserMiddlewares'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'
import path from 'path'

@route('/upload')
export class uploadImagesController {
    #userService: UserService

    constructor ({ userService }) {
        this.#userService = userService
      }

@route('/avatar-user')
@POST()
@before([authMiddlewares, UploadImagesMiddlewares.single('image')])
  async uploadLogoUser (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    await this.#userService.update({...user, avatar_url: request.file.filename}, user.id)

    if(request.file) return response.status(201).json({
        url: request.file.filename
    })
  }

@GET()
@before([authMiddlewares])
  async getLogoUser (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    console.log(path.resolve(__dirname + '../../../', 'uploads/post', user.avatar_url))

    if(user.avatar_url) return response.status(201).sendFile(path.resolve(__dirname + '../../../','uploads/user', user.avatar_url))

    return response.sendStatus(404)
  }

@route('/post-file')
@POST()
@before([authMiddlewares, UploadImagesMiddlewares.single('image')])
  async uploadLogoPost (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    await this.#userService.update({...user, avatar_url: request.file.filename}, user.id)

    if(request.file) return response.status(201).json({
        url: request.file.filename
    })
  }

@route('/post-file')
@GET()
@before([authMiddlewares])
  async getLogoPost (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    console.log(path.resolve(__dirname + '../../../', 'uploads/posts', user.avatar_url))

    if(user.avatar_url) return response.status(201).sendFile(path.resolve(__dirname + '../../../','uploads/posts', user.avatar_url))

    return response.sendStatus(404)
  }
}