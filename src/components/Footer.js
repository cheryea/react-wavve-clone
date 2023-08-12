import React from "react";

const Footer = () => {
  return (
    <footer className="pc-widths">
      <div className="flexs">
        <ul className="pc-onlys-flex">
          <li>회사소개</li>
          <li>인재채용</li>
          <li>서비스소개</li>
          <li>이용약관</li>
          <li>
            <span>개인정보 처리방침</span>
          </li>
          <li>고객센터</li>
        </ul>
        <ul className="flexs mobile-onlys">
          <li>이용약관</li>
          <li>
            <span>개인정보 처리방침</span>
          </li>
          <li>고객센터</li>
        </ul>
      </div>
      <div className="mobile-onlys">
        <div>
          <p>콘텐츠웨이브 주식회사 / 대표이사: 이태현</p>
          <p>주소: 서울특별시 영등포구 여의나루로 60 포스트타워 19층</p>
          <p>사업자등록번호 220-88-38020</p>
        </div>
        <div>
          <p>통신판매업 신고번호 : 제 2021-서울영등포-0585호</p>
          <p>
            통신판매업 정보 공개 :
            http://www.ftc.go.kr/bizCommPop.do?wrkr_no=220-88-38020
          </p>
          <p>
            호스팅서비스제공자 : 마이크로소프트 유한회사, 구글클라우드코리아
            유한회사, 아마존웹서비시즈코리아 유한회사
          </p>
        </div>
        <div>
          <p>
            고객센터 1599-3709 (평일 09:00~18:00 / 점심시간 12:00~13:00 / 주말
            및 공휴일 휴무)
          </p>
          <p>전자우편주소 : helpdesk@wavve.com</p>
        </div>
        <p>Copyright© 콘텐츠웨이브(주) All rights reserved.</p>
      </div>
      <div className="pc-onlys-block">
        <p>
          콘텐츠웨이브 주식회사대표이사 이태현고객센터 1599-3709 (평일
          09:00~18:00 / 점심시간 12:00~13:00 / 주말 및 공휴일 휴무){" "}
        </p>
        <p>
          사업자등록번호 220-88-38020호스팅서비스제공자 : 마이크로소프트
          유한회사, 구글클라우드코리아 유한회사, 아마존웹서비시즈코리아 유한회사
        </p>
        <p>
          통신판매업 신고번호 : 제 2021-서울영등포-0585호통신판매업 정보 공개 :
          http://www.ftc.go.kr/bizCommPop.do?wrkr_no=220-88-38020
        </p>
        <p>
          {" "}
          서울특별시 영등포구 여의나루로 60 포스트타워 19층전자우편주소 :
          helpdesk@wavve.com
        </p>
        <p>Copyright© 콘텐츠웨이브(주) All rights reserved.</p>
      </div>
      <select defaultValue="1" className="pc-onlys-block">
        <option value="1" disabled="disabled" hidden="hidden">
          사업자용 웨이브 가입
        </option>
        <option>웨이브온 서비스 소개</option>
        <option>웨이브온 PC방 서비스</option>
        <option>웨이브온 도서관 서비스</option>
        <option>웨이브온 병원 서비스</option>
        <option>웨이브온 숙박 서비스</option>
        <option>웨이브온 일반 서비스</option>
      </select>
    </footer>
  );
};

export default Footer;
