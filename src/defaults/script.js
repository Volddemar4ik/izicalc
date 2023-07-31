// скрипт изменения расширения картинок на .png
// const fs = require('fs');
// const path = require('path');

// const imageFolder = './'; // Путь к папке с картинками, '.' означает текущую папку

// fs.readdir(imageFolder, (err, files) => {
//     if (err) {
//         console.error('Ошибка при чтении папки:', err);
//         return;
//     }

//     files.forEach((file) => {
//         const fileExtension = path.extname(file).toLowerCase();
//         const newExtension = '.png';

//         if (fileExtension !== newExtension) {
//             if (isImageExtension(fileExtension)) {
//                 const oldPath = path.join(imageFolder, file);
//                 const newPath = path.join(imageFolder, path.basename(file, fileExtension) + newExtension);

//                 fs.rename(oldPath, newPath, (err) => {
//                     if (err) {
//                         console.error(`Ошибка при переименовании ${file}:`, err);
//                     } else {
//                         console.log(`${file} успешно переименован в ${path.basename(file, fileExtension) + newExtension}`);
//                     }
//                 });
//             }
//         }
//     });
// });

// function isImageExtension(extension) {
//     const imageExtensions = ['.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp', '.PNG'];
//     return imageExtensions.includes(extension);
// }




// // скрипт сиздания файла json с урлами всех картинок
// const fs = require('fs');
// const path = require('path');

// const folderPath = './'; // Укажите путь к вашей папке с картинками

// fs.readdir(folderPath, (err, files) => {
//     if (err) {
//         console.error('Ошибка при чтении папки:', err);
//         return;
//     }

//     const imageUrls = {};
//     files.forEach((file) => {
//         if (path.extname(file).toLowerCase() === '.png') {
//             const name = path.basename(file, path.extname(file));
//             imageUrls[name] = file;
//         }
//     });

//     const imageUrlFile = path.join(folderPath, 'coinsUrl.json');
//     const imageUrlContent = JSON.stringify(imageUrls, null, 2);

//     fs.writeFile(imageUrlFile, imageUrlContent, (err) => {
//         if (err) {
//             console.error('Ошибка при записи файла imageUrl.json:', err);
//             return;
//         }
//         console.log('Файл imageUrl.json успешно создан!');
//     });
// });



// // скрипт добавления ключа в объейт json файла
// const fs = require('fs');

// // Замените 'input.json' на путь к вашему JSON файлу
// const inputFile = 'coinsListCopy.json';

// fs.readFile(inputFile, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Ошибка чтения файла:', err);
//         return;
//     }

//     try {
//         const jsonArray = JSON.parse(data);

//         // Добавляем ключ 'default' со значением false в каждый объект
//         for (const obj of jsonArray) {
//             obj['order'] = null;
//         }

//         // Записываем измененные данные обратно в файл
//         fs.writeFile(inputFile, JSON.stringify(jsonArray, null, 2), 'utf8', (err) => {
//             if (err) {
//                 console.error('Ошибка записи в файл:', err);
//                 return;
//             }
//             console.log('Ключ "order" добавлен в каждый объект массива.');
//         });
//     } catch (error) {
//         console.error('Ошибка обработки JSON:', error);
//     }
// });
