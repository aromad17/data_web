import styles from "@/styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer_wrap}>
      <div className={styles.footer_text}>
        (주)우리집랜드월드내방책상사업자등록번호 : 000-123-45678
        <br />
        [만든사람정보]12323 : 오랜시간동안 내이름 : 이상현서울특별시 동작구
        성대로
        <br />
        279-123 (상도동) 우리집컴퓨터개인정보 보호책임자 : 이상현 구직중입니다.
        <br />
        취업 문의는 이메일이나 문자,전화로 부탁드립니다.
      </div>
    </footer>
  );
}
