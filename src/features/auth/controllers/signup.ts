import { ObjectId } from 'mongodb';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';
import { signupSchema } from '@auth/schemes/signup';
import { joiValidation } from '@root/shared/global/decorators/joi-validation.decorators';
import { BadRequestError } from '@root/shared/global/helpers/error-handler';
import { authService } from '@service/db/auth.service';
import { Request, Response, NextFunction } from 'express';
import { Helpers } from '@root/shared/global/helpers/helpers';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@root/shared/global/helpers/cloudinary-upload';
import HTTP_STATUS from 'http-status-codes';

export class Signup {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, email, password, avatarColor, avatarImage } = req.body;
    const checkIfUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if (checkIfUserExist) {
      throw new BadRequestError('Invalid credentials');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    const authData: IAuthDocument = Signup.prototype.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor
    });
    const result: UploadApiResponse = (await uploads(avatarImage, `${userObjectId}`, true, true)) as UploadApiResponse;

    if (!result.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }

    res.status(HTTP_STATUS.CREATED).json({ message: 'User created!', authData });
  }

  private signupData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowercase(email),
      password,
      avatarColor,
      createdAt: new Date()
    } as IAuthDocument;
  }
}
