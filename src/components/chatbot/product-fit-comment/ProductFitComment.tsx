import { useState } from "react";

const ProductFitComment = () => {
  const [value, setValue] = useState(3);
  return (
    <>
      <div>
        <div>
          <img />
        </div>
        <div>
          <img />
          <div>
            <h1></h1>
            <h1></h1>
          </div>
        </div>
        <section>
          <div>
            <div>
              <p></p>
              <p></p>
            </div>
            <p>이 신발을 <span>'기본 핏'</span>으로 분석했어요.</p>
          </div>
          <div className="w-full max-w-md mx-auto p-4">
            <div className="relative pt-10">
              <div
              // defaultValue={[3]}
              // max={5}
              // step={0.1}
              // onValueChange={(val) => setValue(val[0])}
              />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded">
                {value.toFixed(1)}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>작은 신발</span>
              <span>보통</span>
              <span>큰 신발</span>
            </div>
          </div>
        </section>
        <section>
          <p>Satin 소재를 사용하여 매끄럽고 은은한 광택이 느껴지도록 디자인 되었으며 기능적으로는 이중으로 디자인 된 솔 구조가 키 높이 효과와 함께 안정적인 쿠셔닝을 제공합니다. 맨발이 닿는 내측의 라이닝을 가죽 소재로 마감하여 부드럽게 발을 감싸는 착화감을 지니고 있습니다. 힐은 스트랩 구조로 제작되어 있어 사이즈 선택에는 매우 유연합니다. 다만 두꺼운 솔을 가졌기 때문에 조금은 묵직한 느낌이 있어 정 사이즈나 반 사이즈를 작게 신길 추천 드립니다.</p>
        </section>
      </div>
    </>
  );
}
export default ProductFitComment