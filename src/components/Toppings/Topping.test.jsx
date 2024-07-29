import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("APİden gelen veriler için ekrana kartlar basılıyor mu?", async () => {
  render(<Toppings />);
  const images = await screen.findAllByAltText("sos-resim");
  expect(images.length).toBeGreaterThan(0);
});

test("Sosların eklenmesi ve çıkarılması işleminin toplama etkisi", async () => {
  const user = userEvent.setup();
  render(<Toppings />);

  //toplam ücretini al toplam spanı al
  const total = screen.getByTestId("total");
  // Bütün sosları çagır
  const topings = await screen.findAllByRole("checkbox");
  // soslar ücreti sıfır mı
  expect(total.textContent).toBe("0");
  //soslar dan birine ekle
  await userEvent.click(topings[0]);
  //soslar ücreti 3 mü
  expect(total.textContent).toBe("3");
  // başka bir sos ekle
  await user.click(topings[2]);
  // soslar toplamücretini kotrol et 6 mı
  expect(total.textContent).toBe("6");
  // ilk tıklanılan sosa tekrar tıklama
  await user.click(topings[0]);
  // sos toplam ücreti 3 mü
  expect(total.textContent).toBe("3");
  // ikinci tıkladığımız sosa tekrar tıkla
  await user.click(topings[2]);
  // toplam sos ücreti 0 mı
  expect(total.textContent).toBe("0");
});
