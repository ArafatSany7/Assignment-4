import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  try {
    const server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
  }
}

bootstrap();
