import { authRoutes } from '@auth/routes/authRoutes';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use('/api/v1', authRoutes.routes());

    app.get('/api/v1', (req, res) => {
      res.send('Hello');
    });
  };
  routes();
};
