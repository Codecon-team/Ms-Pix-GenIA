import dotenv from 'dotenv';
import path from 'path';

// Alternativa ao import.meta.url
const __dirname = path.resolve(); // raiz do projeto

dotenv.config({ path: path.join(__dirname, '.env') });
