import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { UploadPostImageUseCase } from '../useCases/UploadPostImage/UploadPostImageUseCase';




class UploadPostImageController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
      userId: Yup.string().required(),
      url: Yup.string().required(),
      key: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { location: url = "", key } = req.file;
    let { id } = req.params;
    let { id: userId } = req.user;

    if (!userId) throw new AppError('Not authorized', 401);

    ({ id, userId, url, key } = trimObjectValues({ id, userId, url, key }));

    if (!(await this.schema.isValid({ id, userId, url, key }))) throw new AppError('Validation Fails', 400);

    const uploadPostImageUseCase: UploadPostImageUseCase = container.resolve(UploadPostImageUseCase);

    await uploadPostImageUseCase.execute({ id, userId, url, key });

    return res.status(200).json({ id, url });
  }
}

export default new UploadPostImageController();
