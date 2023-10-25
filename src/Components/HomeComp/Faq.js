import React from "react";
import FaqItem from "./FaqItem";
import "./home.css";

const Faq = () => {
  const accordionData = [
    {
      id: 1,
      title: "Apa itu SCTK - Links?",
      content: ` HopePoints adalah website pelayanan terhadap perempuan dan anak yang mendukung hak-hak perempuan dan anak agar terbebas dari segala bentuk kekerasan,
      dengan komitmen untuk membangun kesadaran dan menciptakan perubahan sosial untuk mencapai dampak yang positif.`,
    },
    {
      id: 2,
      title: "Bagaimana Cara Mendaftar Jadi Pelanggan?",
      content: (
        <div>
          <p>1. Silahkan registrasi dahulu. Jika sudah mempunyai akun Login terlebih dahulu ya.</p>
          <p>1. Silahkan registrasi dahulu. Jika sudah mempunyai akun Login terlebih dahulu ya.</p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Bagaimana Cara Melihat Status Pendaftaran Pelanggan?",
      content: (
        <div>
          <p>1. Silahkan registrasi dahulu. Jika sudah mempunyai akun Login terlebih dahulu ya.</p>
          <p>1. Silahkan registrasi dahulu. Jika sudah mempunyai akun Login terlebih dahulu ya.</p>
        </div>
      ),
    },
    {
      title: "Bagaimana Cara Menyampaikan Feedback Pelayanan Terhadap SCTK?",
      content: (
        <div>
          <p>1. Silahkan registrasi dahulu. Jika sudah mempunyai akun Login terlebih dahulu ya.</p>
          <p>1. Silahkan registrasi dahulu. Jika sudah mempunyai akun Login terlebih dahulu ya.</p>
        </div>
      ),
    },
  ];

  return (
    <section className="faq p-3">
      <div className="faq-title mt-4">
        <h2>Cara Penggunaan</h2>
      </div>

      <div className="faq-list">
        <div className="col-12 col-sm-10 col-lg-9">
          <div className="accordion faq-accordian" id="faqAccordion">
            <div className="accordion">
              {accordionData.map(({ title, content }) => (
                <FaqItem title={title} content={content} />
              ))}
            </div>
          </div>
          <div className="support-button text-center justify-content-center mt-5 mb-0 wow fadeInUp faq-title">
            <h3>Masih punya pertanyaan?</h3>
            <p>Jika kamu tidak menemukan jawaban atas pertanyaan kamu, kamu bisa menghubungi kami melalui kontak yang ada di bagian paling bawah dari halaman website ini.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
