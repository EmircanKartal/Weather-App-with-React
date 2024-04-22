# React Hava Durumu Uygulaması

## Amaç
Bu proje, geliştiricilere API kullanımı, asenkron veri işleme ve dinamik içerik yönetimi gibi konularda becerilerini sergileme fırsatı sunar. Kullanıcılar, uygulama aracılığıyla çeşitli şehirlerin güncel hava durumuna erişebilirler.

## Görseller
Aşağıda uygulamaya ait ekran görüntüleri ve bir video yer almaktadır. 


<div style="display: flex; justify-content: space-between; align-items: center;">
  <img src="https://github.com/EmircanKartal/Weather-App-with-React/assets/88210656/895e13fe-9498-47e8-a450-2608018fcc7c" alt="Uygulama Ekran Görüntüsü 1" style="width: 45%;">
  <img src="https://github.com/EmircanKartal/Weather-App-with-React/assets/88210656/8c72ff73-7af5-4a0b-bab5-d324239611be" alt="Uygulama Ekran Görüntüsü 2" style="width: 52%;">
</div>


### Video Gösterimi
Uygulamanın çalışma şeklini gösteren videoyu aşağıda görebilirsiniz:


https://github.com/EmircanKartal/Weather-App-with-React/assets/88210656/36694ab4-40ef-4724-8459-ea7ff4316ad0


## Uygulama Hakkında
Uygulama OpenWeather API kullanarak hava durumu bilgisini alır ve gerekli değerleri 3 ayrı kart bilgisinde gösterir. Arama çubuğunda aratılan şehrin hava durmu, sıcaklığı, nemi, yağış olasılığı, hissedilen sıcaklığı, rüzgarın hızı, UV endeksi gibi değerlerin bilgisini verir.

## Kurulum

### Gereksinimler
- Node.js
- npm veya yarn

## Adımlar
### Projeyi lokal bilgisayarınıza klonlayın:
```
git clone https://github.com/your-username/Weather-App-with-React.git
cd weather
```
### Gerekli paketleri yükleyin:
```
npm install
```
veya
```
yarn install
```

## Uygulamayı Başlatma
### Uygulamayı geliştirme modunda çalıştırmak için:
```
npm start
```
veya
```
yarn start
```

Bu komut, uygulamayı varsayılan tarayıcınızda localhost:3000 adresinde başlatır.

## Kullanılan Teknolojiler
- React (Create React App)
- Axios
- OpenWeatherMap API

## Karşıladığı İsterler
- **Geolokasyon Desteği:** Kullanıcının mevcut konumuna göre otomatik hava durumu güncellemeleri mevcut. ✅
- **Responsive Tasarım:** Çeşitli cihaz ve ekran boyutlarına uyum sağlayacak şekilde tasarlandı. ✅
- **Hava Durumu İkonları:** Güncel hava durumunu yansıtan dinamik ikonlar gösteriliyor. ✅
- **Hava Durumu Detayları:** Seçilen şehrin sıcaklık, nem, rüzgar hızı, hava durumu açıklaması (güneşli, bulutlu, yağmurlu vb.) gibi temel bilgileri gösteriliyor. ✅
- **Çoklu Şehir Desteği:** Kullanıcılar, birden fazla şehrin hava durumu bilgisini sırayla görüntüleyebiliyor. ✅
