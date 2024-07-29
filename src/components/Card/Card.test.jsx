import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";
const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
};
const basket = [
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
    id: "c3ad",
  },
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
    id: "c3ad",
  },
  {
    name: "Vanilla",
    imagePath: "/images/vanilla.png",
    id: "ad58",
  },
];
// Prop olarak veri alan bileşenleri test ediyorsak
// Aldıkları propların benzerini göndermemiz gerekir
test("Miktar alanı sepet veresine uygundur ve göderdiğim item verisine göre kart içeriği basılır ", async () => {
  // prop gönderdiğimiz gereken orjinal fonksiyonu  Card.test.js de tanımlayamayacağımızdan
  // bu fonksiyonu taklit eden mock fonksiyonu tanımlamak gerekir
  // bu mock foksiyonuyla ne zaman çağrıldı hangi parametrelerle gönderildi testlerini yaparız
  const mockFn = jest.fn();
  render(<Card item={item} basket={basket} setBasket={() => {}} />);

  // miktar spanını çağır
  const amount = screen.getByTestId("amount");
  // örnek sepette 1 chocolate olduğu için miktar 2'dir
  expect(amount.textContent).toBe("2");
  // içerisinde chocolate yazan bir eleman var mı
  screen.getByText(item.name);
  // içerisinde "/image/chocolate.png" yazan resim var mı
  const image = screen.getByAltText("çeşit-resim");
  expect(image).toHaveAttribute("src", item.imagePath);
});
//

test("Buttonlara tıklanınca setMethodu tetiklenir", async () => {
  // prop olarak göndermemiz gerken orjinal fonksiyonu Card.test.js de tanımlayamayacağımızdan
  // bu fonksiyon taklit eden mock fonksiyonu tanımlamak gerekir
  // bu mock fonksiyonuyla ne zaman çağrıldı hangi parametrerle gönderildi testleri yapabiliriz

  const mockFn = jest.fn();
  const user = userEvent.setup();
  render(<Card item={item} basket={basket} setBasket={mockFn} />);
  // buttonları al
  const addBtn = screen.getByRole("button", { name: "Ekle" });
  const delBtn = screen.getByRole("button", { name: "Sıfırla" });
  // akle butonuna tıkla
  await user.click(addBtn);
  //setMethodu doğru parametreler ile çalıştı mı
  expect(mockFn).toHaveBeenCalledWith([...basket, item]);
  // sıfırla butonuna tıkla
  await user.click(delBtn);
  // set methodu doğru parametreler ile çalıştı mı
  expect(mockFn).toHaveBeenCalledWith([
    {
      name: "Vanilla",
      imagePath: "/images/vanilla.png",
      id: "ad58",
    },
  ]);
});
