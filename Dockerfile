# Используем официальный Node образ для сборки
FROM node:18-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Команда запуска dev-сервера Vite на 0.0.0.0, чтобы контейнер был доступен снаружи
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
