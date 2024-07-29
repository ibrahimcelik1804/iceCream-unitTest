import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

/*
 !seçiciler 3 ana parçadan oluşur
 ?method[All]BySeçici
 *method > get | find | query
 * get > element başlangıcta dom'da varsa kullanılır. eleman bulamzsa test  fail olur
 * query > get ile benzer çalışır  ama | eleman bulamazsa null döndürür test devam eder
 * find > elementin ne zaman ekrana basılacağı belli değilse (async)
 * not: find methodu promis döndürür o yüzden async await ile kullanılır
 * 
 * eger all kullanırsak cevap her zaman dizi şeklinde döner.
 */

test("API'den gelen veriler için ekrana bir tane kart basılır", async () => {
  render(<Scoops />);
  // ekrana basılan resimleri al
  const images = await screen.findAllByAltText("çeşit-resim");

  // gelen resimlerin sayısı 1den büyükmü
  expect(images.length).toBeGreaterThanOrEqual(1);
});
test("Çeşit ekleme ve sıfırlama işleminin toplama etkisi", async () => {
  const user = userEvent.setup();
  // bileşeni ekrana bas
  render(<Scoops />);35
  // ekleme ve sıfırlmama butonlarını çagır
  const addButtons = await screen.findAllByRole("button", { name: "Ekle" });
  const delButtons = await screen.findAllByRole("button", { name: "Sıfırla" });
  //toplam spanı çagır
  const total = screen.getByTestId("total");
  //1) toplam fiyat sıfırdır
  expect(total.textContent).toBe("0");
  //2) Ekle butonlarından birine tıkla
  await user.click(addButtons[0]);
  //3) Toplam fiyat 20 olur
  expect(total.textContent).toBe("20");
  //4) farklı bir çeşitten 2 tane daha eklenir
  await user.dblClick(addButtons[2]);
  //5) toplam fiyat 60 olur
  expect(total.textContent).toBe("60");
  //6) 1 tane eklenenin sıfırla butona bas
  await user.click(delButtons[0]);
  //7) toplam fiyat 40 olur
  expect(total.textContent).toBe("40");
  //8) 2 tane ekleneni sifirla
  await user.click(delButtons[2]);
  //9) toplam fiyat sıfır olur
  expect(total.textContent).toBe("0");
});
