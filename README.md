# Todo List

Bu proje, **React, TypeScript ve Vite** kullanılarak geliştirilmiş bir **Yapılacaklar Listesi (Todo List)** uygulamasıdır. Kullanıcılar yeni görev ekleyebilir, görevlerini düzenleyebilir, silebilir ve sürükleyip bırakma (drag and drop) özelliği ile sıralamalarını değiştirebilir.

## 🚀 Teknolojiler

Bu proje aşağıdaki teknolojiler kullanılarak geliştirildi:

- [React](https://react.dev/) - Kullanıcı Arayüzü (UI) kütüphanesi
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenli JavaScript
- [Vite](https://vitejs.dev/) - Hızlı ve modern build aracı
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) - Sürükle ve bırak (drag and drop) desteği
- [Styled Components](https://styled-components.com/) - CSS-in-JS ile stilleme
- [ESLint](https://eslint.org/) - Kod kalitesi ve linter

## 🎯 Kurulum & Çalıştırma

Projeyi yerel ortamına kurmak ve çalıştırmak için aşağıdaki adımları takip edebilirsin:

### 1️⃣ Projeyi Klonla
```sh
git clone https://github.com/eylems/todolist.git
cd todolist
```

### 2️⃣ Bağımlıkları Yükle
```sh
yarn install
# veya
yarn
```

### 3️⃣ Uygulamayı Başlat
```sh
yarn dev
```
Bu komut, geliştirme sunucusunu başlatacak ve uygulama **http://localhost:5173/** adresinde çalışacak.

## 📌 Özellikler

✅ Yeni görev ekleme  
✅ Görevleri düzenleme ve güncelleme  
✅ Görevleri silme  
✅ Sürükleyip bırakma ile sırayı değiştirme  
✅ Responsive ve modern tasarım  

## 🛠 Proje Yapısı
```
/todolist
│── src
│   ├── components    # UI bileşenleri
│   ├── hooks         # Custom hook'lar
│   ├── pages         # Sayfalar
│   ├── styles        # Styled Components dosyaları
│   ├── App.tsx       # Ana uygulama bileşeni
│   ├── main.tsx      # React uygulamasını başlatan dosya
│   └── ...
│── public           # Statik dosyalar
│── package.json     # Proje bağımlılıkları ve script'ler
│── tsconfig.json    # TypeScript konfigürasyonu
│── vite.config.ts   # Vite konfigürasyonu
```



