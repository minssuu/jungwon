/*
 * 중원축록 콘텐츠 편집 안내
 * - 세력은 FACTIONS, 인물은 CHARACTERS 배열에서 추가/수정합니다.
 * - 영상 파일은 dist/assets에 넣고 character.video에 "./assets/파일명.mp4"를 적으면
 *   muted / loop / playsinline / autoplay 속성으로 자동 재생됩니다.
 * - 값이 없는 상세 항목은 화면에 출력하지 않습니다.
 */

const FACTION_GROUPS = [
  { name: "정파", hanja: "正派", slugs: ["shaolin", "wudang", "hwasan", "zhongnan", "kongtong", "kunlun", "qingcheng", "emei", "diancang", "beggars-gang", "martial-alliance"] },
  { name: "오대세가", hanja: "五大世家", slugs: ["namgung-family", "jegall-family", "murong-family", "hebei-peng", "sichuan-tang"] },
  { name: "사파 · 마도", hanja: "邪派 · 魔道", slugs: ["unorthodox-alliance", "heavenly-demon", "blood-cult"] },
  { name: "세외", hanja: "塞外", slugs: ["northern-ice", "southern-beast"] },
  { name: "중립", hanja: "中立", slugs: ["haomun", "imperial-palace"] }
];

const FACTIONS = [
  { slug: "shaolin", name: "소림파", hanja: "少林派", mark: "佛", short: "불법과 계율로 외공의 근본을 지킨다.", summary: "하남 숭산에 뿌리내린 불가 문파. 오랜 역사와 수많은 무학을 바탕으로 정파의 중심을 지켜 왔다.", records: [["상징", "금강저 · 황갈색 · 선장과 계도 · 숭산 소림사"], ["문규 · 신조", "살생을 경계하고 계율을 중히 여긴다. 무공보다 심성을 먼저 닦으며 문도는 엄한 사문 법도 아래 움직인다."], ["대표 무공", "금강심법과 나한권, 대력금강장. 단단한 외공과 중후한 장력으로 정면을 버틴다."], ["보물 · 비기", "장경각에 역대 고승의 무학과 불경이 보관된다. 출입은 신분과 허가에 따라 엄격히 제한된다."], ["강호 관계", "구파일방의 맏형으로 대접받으며 무림맹의 명분을 받친다."]] },
  { slug: "wudang", name: "무당파", hanja: "武當派", mark: "玄", short: "호북 무당산에 자리한 도가 신선파, 부채·부적·보법과 기운을 엮은 선법을 익힌다.", summary: "호북 무당산에 자리한 도가 선법 중심의 신선파. 유려하고 신비로운 겉모습과 달리 실전성이 높은 선법을 전한다.", records: [["상징", "태극 · 백록색 · 백옥접선과 청죽접선 · 호북 무당산"], ["문규 · 신조", "호흡과 기운을 고르게 다스리고 도가의 수양을 실전에 잇는다. 검문이 아니며 선법의 조화와 운용을 중시한다."], ["대표 무공", "부채와 부적, 호흡, 보법, 기운 운용, 진법을 한 흐름으로 엮는 무당 선법."], ["전투 방식", "접선으로 시선과 기운의 흐름을 이끌고 보법과 부적, 진법을 겹쳐 상대의 움직임을 제한한다."], ["문파 분위기", "도사들의 신선풍과 유려한 몸놀림이 두드러지지만, 보여 주기 위한 기예가 아니라 실제 겨룸을 견디는 무학이다."], ["소속 인물", "이대제자 옥허선자 진서연과 유운선 진소연이 기록되어 있다."]] },
  { slug: "hwasan", name: "화산파", hanja: "華山派", mark: "梅", short: "매화처럼 변화무쌍하고 날카로운 검문.", summary: "섬서 화산의 검문. 험준한 산세에서 다듬은 보법과 매화의 변화를 검끝에 담는다.", records: [["상징", "매화 · 자색과 먹색 · 직검 · 섬서 화산"], ["문규 · 신조", "사문의 계율과 검수의 기개를 함께 중시한다. 화려한 변초도 바른 검로를 벗어나서는 안 된다."], ["대표 무공", "매화심법과 매화검법. 빠른 보법으로 각도를 바꾸며 연속된 검초로 빈틈을 벌린다."], ["보물 · 비기", "매화검결과 역대 검수의 심득을 남긴 매화동 검벽."], ["소속 인물", "이대제자 매청연과 진운휘가 기록되어 있다."]] },
  { slug: "zhongnan", name: "종남파", hanja: "終南派", mark: "終", short: "곧은 검로와 도가의 담박함을 잇는다.", summary: "섬서 종남산을 지키는 도가 검문. 화산과 산문은 가깝지만 검의 이치와 문풍은 사뭇 다르다.", records: [["상징", "소나무 · 짙은 회청색 · 장검 · 종남산"], ["문규 · 신조", "허세보다 기초를, 속승보다 오래 버티는 수련을 중히 여긴다."], ["대표 무공", "종남심법과 유운검법. 간결한 검로와 안정된 내공으로 실수를 줄이는 정공이다."], ["강호 관계", "같은 섬서의 화산파와 오랜 경쟁과 교류를 함께 이어 간다."]] },
  { slug: "kongtong", name: "공동파", hanja: "崆峒派", mark: "拳", short: "거친 산세에서 단련한 권장과 외공의 문파.", summary: "감숙 공동산의 정파 문문. 서역으로 통하는 길목을 지키며 실전에 강한 권장과 호흡법을 전한다.", records: [["상징", "기암 · 갈회색 · 철권과 장갑 · 감숙 공동산"], ["문규 · 신조", "문도는 인내와 체력을 먼저 증명해야 한다. 외세가 관문을 넘을 때에는 산문보다 길목을 먼저 지킨다."], ["대표 무공", "공동심법과 복마장. 짧은 거리에서 무게를 실어 상대의 중심을 무너뜨린다."], ["강호 관계", "곤륜과 함께 서역 동향을 가장 먼저 접하는 정파 문파다."]] },
  { slug: "kunlun", name: "곤륜파", hanja: "崑崙派", mark: "崑", short: "높은 산과 긴 거리를 닮은 청정한 검문.", summary: "신강 곤륜산맥에 자리한 도가 검문. 중원과 서역 사이에서 고립된 수련과 경계를 함께 이어 간다.", records: [["상징", "설봉과 학 · 백청색 · 장검 · 곤륜산"], ["문규 · 신조", "심기를 흐리지 않고 검로를 곧게 세우는 것을 첫째로 친다. 외부인의 입문은 드물다."], ["대표 무공", "곤륜심법과 사일검법. 먼 거리에서 곧고 빠르게 찌르며 경쾌한 보법으로 간격을 지킨다."], ["주요 거점", "곤륜 본산과 관문을 살피는 산하 별원."], ["강호 관계", "천마신교와 혈교의 움직임을 가장 가까이에서 경계한다."]] },
  { slug: "qingcheng", name: "청성파", hanja: "靑城派", mark: "靑", short: "사천의 산세를 타고드는 빠르고 은밀한 검.", summary: "사천 청성산의 도가 문파. 번잡함을 멀리하면서도 사천 무림의 이권과 위기에 민감하게 반응한다.", records: [["상징", "청죽 · 청록색 · 경검 · 청성산"], ["문규 · 신조", "몸놀림과 호흡을 가볍게 유지하며 불필요한 다툼을 피한다."], ["대표 무공", "청성심법과 송풍검법. 빠른 보법과 연속된 찌르기로 상대의 측면을 파고든다."], ["강호 관계", "사천당가와 같은 땅에 있어 협력과 견제가 늘 함께한다."]] },
  { slug: "emei", name: "아미파", hanja: "峨嵋派", mark: "峨", short: "부드러운 검과 장법 안에 단호함을 품는다.", summary: "사천 남쪽 아미산의 문파. 섬세한 내가공과 변화 많은 검장을 익히며 문도 간의 예법을 엄격히 지킨다.", records: [["상징", "흰 연꽃 · 백색과 담청색 · 세검 · 아미산"], ["문규 · 신조", "정심과 절도를 중히 여기되 위기 앞에서는 결단을 미루지 않는다."], ["대표 무공", "아미심법과 금정검법, 불광장. 부드럽게 받아 흘린 뒤 날카로운 반격을 잇는다."], ["주요 거점", "금정의 본산과 사천 남부를 잇는 산문 객원."]] },
  { slug: "diancang", name: "점창파", hanja: "點蒼派", mark: "蒼", short: "운남의 험로에서 벼린 빠른 점혈검.", summary: "운남 점창산의 검문. 중원 남단의 길과 남만의 움직임을 살피며 실전적인 검술을 전한다.", records: [["상징", "창산과 운해 · 청백색 · 세검 · 운남 점창산"], ["문규 · 신조", "먼 길과 험지에서도 검과 호흡이 흐트러지지 않아야 한다."], ["대표 무공", "점창심법과 유성검. 빠른 찌르기와 점혈로 짧은 순간에 승부를 가른다."], ["강호 관계", "남만의 세력과 가장 자주 마주하는 구파일방이다."]] },
  { slug: "beggars-gang", name: "개방", hanja: "丐幇", mark: "丐", short: "천하의 길과 저잣말을 잇는 가장 넓은 방파.", summary: "거지와 유랑민의 인연으로 엮인 천하제일방. 전 성에 분타와 지전을 두어 어느 문파보다 빠르게 강호의 기척을 모은다.", records: [["상징", "매듭과 대나무 지팡이 · 갈색 · 타구봉 · 중원 전역"], ["운영방식", "분타가 각지의 사정을 맡고 방주의 명 아래 연결된다. 신분보다 공적과 신의를 중히 본다."], ["대표 무공", "혼원심법과 타구봉법, 항룡장. 다수전과 거리 변화에 강한 실전 무학이다."], ["보물 · 비기", "방주의 신표인 타구봉과 구결. 각지 지전의 암호가 정보망을 잇는다."], ["강호 관계", "정파에 속하지만 민초의 사정과 독자적인 판단을 앞세울 때가 많다."]] },
  { slug: "martial-alliance", name: "무림맹", hanja: "武林盟", mark: "盟", short: "하남을 중심으로 정파와 세가를 묶는 연합체, 강호의 질서와 공동 대응을 명분으로 움직인다.", summary: "하남을 중심으로 구파일방과 오대세가를 잇는 정파 연합체. 문파 사이의 분쟁을 조율하고 강호의 공동 대응을 논한다.", records: [["운영방식", "각 문파와 세가의 대표가 회합해 중대사를 논한다. 맹주의 권위는 참여 세력의 명분과 동의에서 나온다."], ["현재 정세", "삼십 년 전 정사대전 이후 사도련과 표면적인 균형을 유지한다."], ["주요 거점", "하남 무림맹 총단."], ["소속 인물", "남궁세가주 남궁진악이 무림맹주를 맡고 있다."]] },
  { slug: "namgung-family", name: "남궁세가", hanja: "南宮世家", mark: "劍", short: "제왕의 기세를 검에 담은 안휘의 명문세가.", summary: "안휘에 뿌리내린 오대세가의 검가. 무림맹주를 배출하며 정파의 명분과 세가의 이권을 함께 쥐고 있다.", records: [["상징", "창천과 검 · 짙은 남색 · 장검 · 안휘 남궁세가 본가"], ["운영방식", "직계 혈통과 가주의 권위를 중시한다. 후계는 무공과 통솔, 가문의 인정을 함께 받아야 한다."], ["대표 무공", "창천심법과 제왕검형. 강한 내공과 빈틈없는 정면 압박으로 상대의 검세를 꺾는다."], ["보물 · 비기", "가주에게 전해지는 제왕검결과 역대 가주의 검."], ["강호 관계", "무림맹과 가장 깊게 얽혀 있으며 다른 세가와 혼맥과 이권을 두고 저울질한다."], ["소속 인물", "가주이자 무림맹주인 남궁진악."]] },
  { slug: "jegall-family", name: "제갈세가", hanja: "諸葛世家", mark: "陣", short: "병법과 기관진으로 판을 먼저 읽는 안휘의 세가.", summary: "안휘에 자리한 책사와 기관술의 명가. 칼을 뽑기 전에 지형과 사람, 퇴로를 계산하는 것으로 이름 높다.", records: [["상징", "팔괘 · 미색과 먹색 · 철선 · 안휘 제갈세가 본가"], ["운영방식", "학문과 관찰, 계산 능력을 혈통만큼 중시한다. 중요한 일은 여러 수의 대비책을 세운 뒤 움직인다."], ["대표 무공", "현기심법과 기문진법, 철선술. 준비된 지형과 기관 안에서 가장 강하다."], ["보물 · 비기", "역대 진도와 기관 설계를 모은 천기고. 가문 밖으로 원본을 내보내지 않는다."], ["강호 관계", "무림맹과 세가의 회합에서 군사와 중재자를 자주 맡는다."], ["소속 인물", "군사 제갈린이 기록되어 있다."]] },
  { slug: "murong-family", name: "모용세가", hanja: "慕容世家", mark: "燕", short: "강남의 부와 교유를 무기로 삼는 유려한 무가.", summary: "강남 수로와 상권을 기반으로 성장한 오대세가. 넓은 교유와 세련된 무학으로 세가 사이의 균형을 살핀다.", records: [["상징", "제비 · 짙은 청록색 · 검과 부채 · 강남 모용세가"], ["운영방식", "혼맥과 상단, 객경의 인맥을 촘촘히 잇는다. 후계자는 무공뿐 아니라 가산을 다룰 식견을 갖춰야 한다."], ["대표 무공", "연수심법과 낙영검법. 상대의 초식을 비껴 흘리며 빈 공간을 파고든다."], ["강호 관계", "강남의 만박루와 전장, 수로 세력과 폭넓게 거래한다."]] },
  { slug: "hebei-peng", name: "하북팽가", hanja: "河北彭家", mark: "刀", short: "한 자루 도에 가문의 기개를 싣는 하북의 무가.", summary: "하북의 넓은 평야를 지켜 온 도법 명가. 직선적인 기풍과 강한 결속으로 오대세가의 한 축을 이룬다.", records: [["상징", "흑호 · 철회색 · 대도 · 하북 팽가장"], ["운영방식", "가주의 명과 혈족의 결속이 강하다. 후계는 힘과 책임을 공개된 비무에서 증명한다."], ["대표 무공", "혼원도심법과 오호단문도. 묵직한 일격으로 방어와 자세를 함께 부순다."], ["보물 · 비기", "가주에게 전하는 흑철대도와 도결."], ["강호 관계", "황궁과 가까운 하북에 있어 관무불가침의 경계를 특히 조심한다."]] },
  { slug: "sichuan-tang", name: "사천당가", hanja: "四川唐家", mark: "毒", short: "독과 암기, 혈통과 비전으로 닫힌 사천의 세가.", summary: "사천에 뿌리내린 독과 암기의 명가. 정면의 위세보다 준비와 거리, 정확한 한 수를 중히 여긴다.", records: [["상징", "자죽과 독정 · 백록색 · 암기와 접선 · 사천 당가타"], ["운영방식", "혈통과 비전의 유출을 엄금한다. 후계는 독의 조제와 해독, 암기술과 가문 운영을 함께 익힌다."], ["대표 무공", "독경과 당가암기술. 독으로 선택지를 줄이고 보이지 않는 각도에서 암기를 잇는다."], ["보물 · 비기", "해독단과 비전 독보, 장인들이 만든 기관암기. 조제법은 직계와 허가받은 이에게만 전한다."], ["강호 관계", "청성파와 사천의 질서를 두고 협력하면서도 서로를 견제한다."], ["소속 인물", "소가주 당청아와 장남 당휘."]] },
  { slug: "heavenly-demon", name: "천마신교", hanja: "天魔神敎", mark: "魔", short: "강자존을 받드는 관외 마도의 패자.", summary: "서역 극서에 자리한 마도의 거대 교단. 힘으로 자신의 가치를 증명한 자가 위에 서며 관문 밖에서 중원을 마주한다.", records: [["상징", "붉은 마문 · 검정과 암적색 · 검과 권 · 서역 극서 신교총단"], ["교리 · 운영방식", "강한 자의 명이 곧 질서다. 교주는 힘과 지배력을 증명해야 하며 후계 또한 이름만으로 자리를 얻지 못한다."], ["대표 무공", "천마신공. 폭발적인 내공과 압도적인 화력을 내지만 그 힘에는 반드시 대가가 따른다."], ["보물 · 비기", "교주의 성물과 천마신공 원본. 교주 계승과 함께 엄중히 전해진다."], ["강호 관계", "관문 밖에서 무림맹과 대치한다. 사도련과도 한 편이 아니며 혈교를 이단으로 경계한다."], ["소속 인물", "교주 천소월, 후계자 천소소, 독마각주 초련."]] },
  { slug: "unorthodox-alliance", name: "사도련", hanja: "邪道聯", mark: "邪", short: "명분보다 실리와 계약을 앞세운 사파의 연합.", summary: "각지 사파를 계약과 이권으로 묶은 연합. 하나의 사문이라기보다 이해가 맞는 동안 유지되는 거대한 거래에 가깝다.", records: [["상징", "검은 깃발 · 암갈색 · 세력마다 다름 · 중원 내 여러 련단"], ["운영방식", "공적과 이익으로 서열을 정하며 계약의 문구를 중시한다. 거래가 끝나면 동맹도 끝날 수 있다."], ["대표 무공", "통일된 무학은 없다. 녹림의 도법, 수로채의 수전술, 각 문파의 기문병기가 뒤섞인다."], ["주요 거점", "호북과 하남 산지의 녹림, 장강의 수로십팔채와 여러 련단."], ["강호 관계", "무림맹과 중원 이권을 두고 국지전을 벌이며 천마신교와도 거리를 둔다."]] },
  { slug: "blood-cult", name: "혈교", hanja: "血敎", mark: "血", short: "피와 금단의 무공을 좇는 강호의 공적.", summary: "피와 생명을 대가로 금단의 무공을 좇는 이단 교파. 정파와 사파, 마도를 가리지 않고 토벌 대상으로 지목된다.", records: [["상징", "핏빛 초승달 · 암적색 · 혈도와 갈고리 · 서역 극서의 은거지"], ["교리 · 운영방식", "살아 있는 기혈을 힘의 근원으로 여긴다. 강제와 공포로 교도를 묶으며 흔적을 감추기 위해 거점을 옮긴다."], ["대표 무공", "혈공과 섭혈술. 타인의 기혈을 해쳐 짧은 시간 위력을 끌어올리는 금단의 무학이다."], ["보물 · 비기", "혈경과 제의용 성물. 소유만으로도 강호의 추적을 부른다."], ["강호 관계", "정사마 모두가 공적으로 본다. 천마신교 또한 같은 마도로 인정하지 않는다."]] },
  { slug: "northern-ice", name: "북해빙궁", hanja: "北海氷宮", mark: "雪", short: "장성 밖 설원에서 빙공을 지키는 폐쇄적인 궁.", summary: "장성 밖 북해의 혹한에 자리한 세외 문파. 중원에 전례가 드문 빙공과 독자적인 예법을 지킨다.", records: [["상징", "설화 · 백색과 담청색 · 북해빙궁"], ["문규 · 신조", "궁의 생존과 혈맥, 오랜 맹약을 중시한다. 외부인은 신분보다 약속을 지키는지로 판단한다."], ["대표 무공", "빙공. 차가운 내공으로 상대의 움직임과 호흡을 늦춘다."], ["보물 · 비기", "만년한옥과 빙정. 빙공 수련과 내상 치료에 쓰이지만 함부로 내주지 않는다."], ["강호 관계", "중원의 다툼에는 거리를 두며 천마신교와 북방 세력의 움직임을 경계한다."], ["소속 인물", "소궁주 설연화가 기록되어 있다."]] },
  { slug: "southern-beast", name: "남만야수궁", hanja: "南蠻野獸宮", mark: "獸", short: "남만의 밀림과 맹수 속에서 살아남은 세외의 궁.", summary: "운남 남쪽 밀림에 자리한 세외 세력. 중원의 문법보다 부족의 맹약과 생존의 규율을 따른다.", records: [["상징", "맹수의 발톱 · 녹갈색 · 창과 권갑 · 남만 밀림의 야수궁"], ["운영방식", "부족 수장들의 맹약과 궁주의 힘으로 결속한다. 사냥과 수련, 전투를 분리하지 않는다."], ["대표 무공", "야수심법과 백수권. 지형을 타고 거리를 좁혀 강한 완력과 변칙적인 보법으로 압박한다."], ["보물 · 비기", "밀림의 영약과 맹수의 독, 부족마다 전하는 사냥 비법."], ["강호 관계", "점창파와 국경의 길목에서 자주 마주치며 중원 세력의 간섭을 경계한다."]] },
  { slug: "haomun", name: "하오문", hanja: "下五門", mark: "耳", short: "가장 낮은 곳에서 가장 많이 보는 강호의 정보망.", summary: "주루와 객잔, 시장과 뒷골목에 뿌리내린 정보 문파. 어느 편에도 서지 않고 모든 편에게 소식과 진실을 판다.", records: [["상징", "접힌 쪽지와 귀 · 먹색과 탁한 홍색 · 화선 · 하남 취화루"], ["운영방식", "정보는 정확도와 위험에 따라 값이 달라진다. 의뢰인의 신분보다 대가와 약속을 보며, 깊이 캘수록 흔적도 크게 남는다."], ["대표 무공", "은신과 경신에 능하다. 정면 승부보다 추적을 떼고 소식을 지키는 데 맞춰져 있다."], ["주요 거점", "총타 취화루와 천하 각지의 주루, 객잔, 시장에 숨은 연락망."], ["강호 관계", "정파와 사도련, 천마신교와 황궁 모두에게 판다. 누구의 편도 아니기에 누구도 완전히 믿지 않는다."], ["소속 인물", "하오문 문주이자 취화루 주인인 월희."]] },
  { slug: "imperial-palace", name: "황궁", hanja: "皇宮", mark: "皇", short: "천하를 다스리는 명 황실, 원칙상 강호와 거리를 두지만 필요할 때는 황명으로 무림을 움직인다.", summary: "대명 황조의 심장. 관무불가침으로 강호와 선을 긋지만 황궁의 공식 소집만은 어느 문파도 가벼이 넘기기 어렵다.", records: [["상징", "황실 인장 · 짙은 황갈색과 자금색 · 의장검 · 하북 황궁"], ["권력 구조", "후사가 없는 황제 아래 환관과 권신, 종친이 조정을 나눠 쥔다. 황태자의 빈자리는 누구도 쉽게 입에 올리지 못한다."], ["운영방식", "황명과 관료 체계가 모든 판단의 근거다. 강호에 손을 뻗을 때에는 정식 소집이나 밀명이 사용된다."], ["보물 · 비기", "황실 보고와 금고, 역대 황명의 원본이 내고에 보관된다."], ["주요 거점", "황궁과 육부, 금의의 관청."], ["강호 관계", "관은 강호를 넘보지 않고 강호는 관의 문턱을 밟지 않는다. 다만 황궁의 부름만은 예외다."], ["소속 인물", "제일황녀 진무령. 정덕제의 후사 부재 속에서 조용히 사람과 권력을 모으고 있다."]] }
];

const FACTION_INDEX_COPY = {
  shaolin: "하남 숭산에 자리한 불문 무림의 태산북두, 권장과 강맹한 외공으로 이름 높다.",
  wudang: "호북 무당산에 자리한 도가 신선파, 부채·부적·보법과 기운을 엮은 선법을 익힌다.",
  hwasan: "섬서 화산에 자리한 검파, 날카롭고 변화 많은 검술로 이름 높은 도가 문파다.",
  zhongnan: "섬서 종남산을 근거로 삼는 도가 문파, 정통 내공과 안정된 검로를 중시한다.",
  kongtong: "서북 공동산에 자리한 정파 문파, 거칠고 강직한 무공과 실전성을 중시한다.",
  kunlun: "중원 서쪽 곤륜산맥을 지키는 도가 문파, 깊은 내공과 고고한 문풍으로 알려져 있다.",
  qingcheng: "사천 청성산에 자리한 도가 문파, 빠른 보법과 유려한 무공 운용에 능하다.",
  emei: "사천 아미산을 근거로 하는 불문계 정파, 섬세하면서도 날카로운 무공을 전승한다.",
  diancang: "운남 점창산에 자리한 검파, 빠르고 정밀한 검술과 남방 특유의 실전 감각을 지녔다.",
  "beggars-gang": "천하 각지에 분타와 지전을 둔 거지들의 대방파, 방대한 인맥과 정보망이 최대의 무기다.",
  "martial-alliance": "하남을 중심으로 정파와 세가를 묶는 연합체, 강호의 질서와 공동 대응을 명분으로 움직인다.",
  "namgung-family": "안휘를 기반으로 한 명문 검가, 제왕검형과 강한 가문 규율로 이름 높다.",
  "jegall-family": "책략과 진법, 정보 운용에 강한 지략가문으로 무림의 판세를 읽는 데 능하다.",
  "murong-family": "강남과 북방을 잇는 유서 깊은 세가, 넓은 인맥과 다양한 무학으로 세력을 유지한다.",
  "hebei-peng": "하북을 기반으로 한 호방한 무가, 중병기와 강맹한 도법으로 정면승부에 강하다.",
  "sichuan-tang": "사천에 뿌리내린 독과 암기의 명가, 정면보다 보이지 않는 거리에서 더욱 위험하다.",
  "unorthodox-alliance": "중원의 사파 문파와 방회를 묶은 연합세력, 명분보다 이권과 힘의 균형으로 움직인다.",
  "heavenly-demon": "서역 극서에 자리한 마도의 거대 세력, 강자존과 절대적 복종을 질서로 삼는다.",
  "blood-cult": "정사마를 가리지 않고 배척받는 강호의 공적, 피와 금단의 무공을 좇는 광신적 세력이다.",
  "northern-ice": "북방 설원 너머에 자리한 폐쇄적 세외세력, 혹한과 빙공을 기반으로 독자적인 질서를 지킨다.",
  "southern-beast": "남방 밀림 깊숙이 자리한 세외세력, 짐승·독충·거친 자연과 함께 살아가는 독특한 무학을 쓴다.",
  haomun: "기루·객잔·시장과 뒷골목에 뿌리내린 정보조직, 돈이 닿는 곳이라면 어디서든 소문을 사고판다.",
  "imperial-palace": "천하를 다스리는 명 황실, 원칙상 강호와 거리를 두지만 필요할 때는 황명으로 무림을 움직인다."
};

const FACTION_HERO_IMAGES = {
  shaolin: "shaolin.webp", wudang: "wudang.webp", hwasan: "hwasan.webp", zhongnan: "zhongnan.webp",
  kunlun: "kunlun.webp", qingcheng: "qingcheng.webp", emei: "emei.webp", diancang: "diancang.webp",
  "beggars-gang": "beggars-gang.webp", "martial-alliance": "martial-alliance.webp",
  "namgung-family": "namgung-family.webp", "jegall-family": "jegall-family.webp", "murong-family": "murong-family.webp",
  "hebei-peng": "hebei-peng.webp", "sichuan-tang": "sichuan-tang.webp", "unorthodox-alliance": "unorthodox-alliance.webp",
  "heavenly-demon": "heavenly-demon.webp", "blood-cult": "blood-cult.webp", "northern-ice": "northern-ice.webp",
  "southern-beast": "southern-beast.webp", haomun: "haomun.webp", "imperial-palace": "imperial-palace.webp"
};

const MAIN_FORCES = [
  ["肆", "황실", "대명 황조. 강호 밖의 권력이자 황명의 근원."],
  ["壹", "정파", "구파일방과 무림맹. 명분과 질서를 따른다."],
  ["伍", "오대세가", "혈통으로 이어지는 명문 무가. 이권과 명분을 저울질한다."],
  ["貳", "사파", "사도련. 명분보다 실리와 계약을 앞세운다."],
  ["參", "마도", "천마신교. 강자존을 받드는 관외의 패자."],
  ["陸", "세외", "중원 밖의 강자들. 중원의 법도에 얽매이지 않는다."],
  ["柒", "혈교", "피와 금단의 무공을 좇는 이단. 강호의 공적."],
  ["捌", "하오문", "뒷골목의 정보망. 가장 낮은 곳에서 가장 많이 본다."]
];

const CHARACTER_GROUPS = [
  { slug: "hwasan", name: "화산파", hanja: "華山派", category: "정파" },
  { slug: "wudang", name: "무당파", hanja: "武當派", category: "정파" },
  { slug: "namgung", name: "남궁세가", hanja: "南宮世家", category: "세가" },
  { slug: "jegalsega", name: "제갈세가", hanja: "諸葛世家", category: "세가" },
  { slug: "sichuan-tang", name: "사천당가", hanja: "四川唐家", category: "세가" },
  { slug: "heavenly-demon", name: "천마신교", hanja: "天魔神敎", category: "사파&마도" },
  { slug: "haomun", name: "하오문", hanja: "下五門", category: "중립" },
  { slug: "imperial-palace", name: "황궁", hanja: "皇宮", category: "중립" },
  { slug: "northern-ice", name: "북해빙궁", hanja: "北海氷宮", category: "중립" }
];

function characterRecord(data) {
  return {
    title: "",
    age: "",
    height: "",
    alias: "",
    quote: "",
    cardLead: "",
    description: "",
    appearanceLead: "",
    appearance: "",
    temperamentLead: "",
    personality: "",
    speech: "",
    martialLead: "",
    martialArts: "",
    weapon: "",
    traitsLead: "",
    traits: "",
    relationships: "",
    lifeLead: "",
    life: "",
    habitLead: "",
    habit: "",
    affectionLead: "",
    affection: "",
    voiceLine: "",
    past: "",
    tmi: "",
    ...data
  };
}

const CHARACTERS = [
  characterRecord({
    slug: "mae-cheongyeon",
    name: "매청연",
    group: "hwasan",
    video: "./assets/characters/mae-cheongyeon.mp4",
    title: "화산파 이대제자",
    age: "26세",
    height: "171cm",
    alias: "상매검",
    quote: "차갑고 정확하며, 틀린 것을 모른 척 넘기지 않는다.",
    cardLead: "차갑고 정확한 매화검",
    description: "화산의 법도에서 어긋난 일을 그냥 넘기지 않는다. 그 성정 때문에 적이 많다는 사실도 스스로 알고 있다.",
    appearanceLead: "긴 검은 머리와 검은 눈동자를 지녔다.",
    appearance: "청색 도포를 갖춰 입고 매화검을 지닌다.",
    temperamentLead: "틀린 것을 넘기지 않는 사람",
    personality: "차갑고 정확하다. 자신의 단정함이 사람을 베고 적을 만든다는 사실까지 외면하지 않는다.",
    speech: "단정한 경어를 쓴다. 화가 날수록 목소리를 낮추고 말은 더 정확해진다.",
    martialLead: "화산의 매화검법",
    martialArts: "매화검법",
    weapon: "매화검",
    traitsLead: "원칙이 남기는 대가",
    traits: "옳고 그름을 흐리지 않으며, 그 때문에 생긴 적도 자신의 몫으로 받아들인다.",
    lifeLead: "각을 맞춘 방 · 쓴 약차",
    life: "방과 서책을 흐트러짐 없이 정리하고 검을 손질하는 데 유난히 공을 들인다. 쓴 약차를 즐기며 술은 거의 입에 대지 않는다.",
    habitLead: "검집에 닿는 엄지",
    habit: "생각이 깊어질 때면 엄지로 검집 입구를 한 번 쓸어내린다. 사형제들 사이에서도 쉽게 긴장을 풀 수 없는 사람으로 통한다.",
    affectionLead: "원칙과 마음을 따로 세우는 사람",
    affection: "마음이 움직여도 특별 대우부터 경계한다. 다만 한번 뜻을 정하면 오래 지킨다.",
    voiceLine: "처음 뵙습니다. 용건이 무엇입니까."
  }),
  characterRecord({
    slug: "jin-unhwi",
    name: "진운휘",
    group: "hwasan",
    video: "./assets/characters/jin-unhwi.mp4",
    title: "화산파 이대제자",
    age: "29세",
    height: "181cm",
    alias: "직검",
    quote: "검은 곧으나, 사람 앞에서는 서툴다.",
    cardLead: "말보다 행동이 먼저",
    description: "호의를 말로 꾸미지 못하고 직접 움직여 갚는다. 해야 할 말을 삼키다가 때를 놓치는 일이 잦다.",
    appearanceLead: "긴 검은 머리를 반묶음으로 올리고 검은 눈동자를 지녔다.",
    appearance: "청색 도포를 갖춰 입고 매화검을 허리에 찬다.",
    temperamentLead: "곧은 검 · 서툰 사람",
    personality: "사람을 대하는 데에는 서툴지만 받은 호의를 잊지 않는다. 설명보다 행동으로 뜻을 보이는 쪽을 택한다.",
    speech: "짧은 경어를 쓴다. 변명하지 못하고 할 말을 삼키다 때를 놓친다.",
    martialLead: "화산의 검술",
    martialArts: "화산의 검술을 익혔다.",
    weapon: "매화검",
    traitsLead: "행동으로 갚는 호의",
    traits: "말이 늦어도 받은 은의에는 반드시 몸을 움직여 답한다.",
    lifeLead: "홀로 하는 수련 · 정교한 검 손질",
    life: "혼자 수련하고 검을 돌보는 시간을 좋아한다. 다른 손일에는 서툴러도 검을 다룰 때만큼은 빈틈이 없으며, 술 한 잔에도 쉽게 졸음이 든다.",
    habitLead: "말이 막히면 검집 끝으로",
    habit: "무리한 청은 잘라 거절하지만 명분 있는 부탁에는 결국 몸을 움직인다. 할 말을 찾지 못하면 엄지로 검집 끝을 쓸어내린다.",
    affectionLead: "먼저 해두는 마음",
    affection: "표현하려 할수록 서툴고 때를 놓친다. 대신 필요한 일을 기억해 두었다가 말없이 먼저 처리한다.",
    voiceLine: "저와 있을 때는... 편히 계셔도 됩니다."
  }),
  characterRecord({
    slug: "jin-seoyeon",
    name: "진서연",
    group: "wudang",
    video: "./assets/characters/jin-seoyeon.mp4",
    title: "무당파 이대제자 · 옥허선자",
    age: "29세",
    height: "168cm",
    alias: "옥허선자",
    quote: "온화한 웃음 뒤로 속내를 감춘 무당의 옥허선자.",
    cardLead: "웃음을 거두지 않는 옥허선자",
    description: "접선과 선법을 잇는 무당의 이대제자. 거절할 때에도 나긋한 미소를 거두지 않는다.",
    appearanceLead: "검은색과 흰색이 섞인 긴 머리에 보랏빛 눈동자를 지녔다.",
    appearance: "백록 유삼에 녹대를 두르고 백옥접선을 지닌다.",
    temperamentLead: "온화한 웃음 · 읽기 어려운 속내",
    personality: "늘 온화하게 웃으며 속내를 감춘다. 뜻을 거절할 때에도 웃음을 거두지 않아 그 진의를 읽기 어렵다.",
    speech: "나긋한 해요체를 쓰며 상대의 신분이 낮아도 하대하지 않는다.",
    martialLead: "접선으로 펼치는 도가 선법",
    martialArts: "무당 선법",
    weapon: "백옥접선",
    traitsLead: "거절에도 흐트러지지 않는 태도",
    traits: "진소연의 언니다. 마음이 움직여도 나긋한 태도와 읽기 어려운 속내는 쉽게 달라지지 않는다.",
    lifeLead: "자소궁 곁 별채 · 백단향과 차",
    life: "무당산 자소궁 곁 별채에 머물며 새벽마다 선법과 호흡을 수련한다. 고시문을 즐겨 읽고 차를 잘 내리며, 은은한 백단향을 두른다.",
    habitLead: "한 잔에도 붉어지되 흐트러지지 않음",
    habit: "매실주 한 잔에도 낯빛은 붉어지지만 말과 몸가짐은 끝내 흐트러지지 않는다.",
    affectionLead: "붙잡기보다 기억하는 마음",
    affection: "태도는 좀처럼 달라지지 않지만 상대의 작은 취향을 기억해 조용히 챙긴다. 먼저 손을 뻗어 붙잡지는 않는다.",
    voiceLine: "웃으면서 말해도, 안 되는 건 안 되죠."
  }),
  characterRecord({
    slug: "jin-soyeon",
    name: "진소연",
    group: "wudang",
    video: "./assets/characters/jin-soyeon.mp4",
    title: "무당파 이대제자 · 유운선",
    age: "24세",
    height: "163cm",
    alias: "유운선",
    quote: "가벼운 웃음과 장난 뒤에서 다음 수를 빠르게 셈한다.",
    cardLead: "장난과 계산이 빠른 유운선",
    description: "붙임성 있게 사람 사이로 파고들면서도 속으로는 상황을 빠르게 셈한다. 언니와 다른 자유로운 길을 택했다.",
    appearanceLead: "검은색과 흰색이 섞인 짧은 머리에 보랏빛 눈동자를 지녔다.",
    appearance: "백록 유삼에 녹대를 두르고 청죽접선을 지닌다.",
    temperamentLead: "붙임성 좋은 장난 · 빠른 셈",
    personality: "붙임성과 장난기가 있어 사람 사이로 쉽게 파고든다. 겉은 가벼워 보여도 속으로는 상황과 상대의 반응을 빠르게 계산한다.",
    speech: "반말이 섞인 애교 있는 말씨를 빠르고 가볍게 쓴다.",
    martialLead: "청죽접선과 무당 선법",
    martialArts: "무당 선법",
    weapon: "청죽접선",
    traitsLead: "언니와 다른 길",
    traits: "진서연의 동생이지만 같은 모양으로 살지 않는다. 무당 안에서도 더 자유로운 방향을 택했다.",
    lifeLead: "저잣거리의 군것질 · 아끼는 장신구",
    life: "몰래 저잣거리에서 엿과 사탕을 사 먹고, 언니의 선법을 흉내 내다가 꾸지람을 듣곤 한다. 접선보다 노리개와 장신구를 더 소중히 여긴다.",
    habitLead: "가벼워 보여도 먼저 살피는 퇴로",
    habit: "술을 잘하지 못하면서도 태연한 척한다. 곤란한 형세에서는 허세를 부리기보다 몸을 먼저 사린다.",
    affectionLead: "장난 끝에 꼬이는 말끝",
    affection: "마음이 갈수록 장난과 능청이 늘어난다. 들키면 말끝이 꼬이고, 질투는 괜한 참견으로 드러난다.",
    voiceLine: "너한텐 그냥... 솔직히 말해도 되지?"
  }),
  characterRecord({
    slug: "namgung-jinak",
    name: "남궁진악",
    group: "namgung",
    video: "./assets/characters/namgung-jinak.mp4",
    title: "남궁세가주 · 무림맹주",
    age: "54세",
    height: "185cm",
    quote: "맹주와 가주 사이에서, 그는 언제나 하나를 버려야 한다.",
    cardLead: "대의와 가문 사이의 화경 고수",
    description: "무림맹의 대의를 따르지만 그 선택은 자주 남궁세가의 뜻과 어긋난다. 두 자리를 함께 지키는 대가를 외면하지 않는다.",
    appearanceLead: "검은 머리를 상투로 틀고 수염과 짙은 눈썹, 검은 눈동자를 지녔다.",
    appearance: "은빛 자수를 놓은 남색 비단 도포를 갖춰 입는다.",
    temperamentLead: "맹주의 대의 · 가주의 책임",
    personality: "대의를 좇되 가문과의 충돌을 피하지 않는다. 맹주와 가주의 선택이 갈리면 하나를 버리는 결단을 내린다.",
    speech: "낮고 굵은 하대를 쓰며 같은 말을 두 번 하지 않는다.",
    martialLead: "남궁의 제왕검형",
    martialArts: "제왕검형",
    weapon: "검",
    traitsLead: "두 자리가 요구하는 결단",
    traits: "가주와 맹주라는 두 책임이 충돌할 때 결정을 미루지 않는다.",
    lifeLead: "가주전보다 연무장",
    life: "가주전보다 연무장에 오래 머물며 독한 죽엽청을 즐긴다. 젊은 시절 왼팔에 남은 검상은 궂은 날이면 다시 욱신거린다.",
    habitLead: "비무로 보는 실력과 사람됨",
    habit: "눈에 띄는 후기지수에게 직접 비무를 청해 무공뿐 아니라 사람됨까지 시험한다.",
    affectionLead: "애정보다 신뢰와 책임",
    affection: "아내와 사별한 뒤 재혼하지 않았다. 쉽게 마음을 열지 않지만 한번 인정한 상대에게는 말보다 책임으로 뜻을 보인다.",
    voiceLine: "다음에도 내 앞에 서 보아라."
  }),
  characterRecord({
    slug: "jegallin",
    name: "제갈린",
    group: "jegalsega",
    video: "./assets/characters/jegallin.mp4",
    title: "제갈세가 군사",
    age: "34세",
    height: "166cm",
    quote: "부드럽게 귀를 기울이고, 결단할 때에는 흔들리지 않는다.",
    cardLead: "다정하되 중심이 단단한 군사",
    description: "타인의 말을 끝까지 듣고 부드럽게 답한다. 판단이 서는 순간에는 짧고 단호하게 결정을 내린다.",
    appearanceLead: "검은빛이 감도는 갈색의 긴 머리와 갈색 눈동자를 지녔다.",
    appearance: "미색 도포와 흑대, 비취 귀걸이를 갖췄다. 하반신을 쓰지 못한다.",
    temperamentLead: "온화한 경청 · 단단한 결단",
    personality: "온화하고 다정하며 타인의 말을 잘 들어준다. 판단이 서면 망설이지 않고 결단하며, 억지로 누르지 않아도 자연스럽게 사람을 따르게 하는 중심이 있다.",
    speech: "나긋한 경어로 부드럽게 답한다. 결정할 때에는 말이 짧고 단호해진다.",
    weapon: "철선골 접선",
    traitsLead: "사람을 따르게 하는 부드러운 중심",
    traits: "상대를 존중하면서도 결정의 책임을 피하지 않는다.",
    lifeLead: "군사전의 바둑 · 진한 흑차",
    life: "군사전에서 홀로 바둑을 두며 생각을 정리하고 진한 흑차를 즐긴다. 이동할 때에는 시비가 미는 죽여를 쓴다.",
    habitLead: "끝까지 듣고 내리는 결정",
    habit: "상대의 말을 끊지 않고 끝까지 들은 뒤 판단한다. 결정을 내린 다음에는 좀처럼 뒤집지 않는다.",
    affectionLead: "시험하지 않는 다정함",
    affection: "마음을 시험하거나 재지 않고 평소의 다정함을 지킨다. 깊어질수록 자신의 약한 부분과 선택을 조금씩 상대에게 맡긴다.",
    voiceLine: "제 앞에서는 굳이 괜찮은 체하지 않으셔도 돼요."
  }),
  characterRecord({
    slug: "dang-cheonga",
    name: "당청아",
    group: "sichuan-tang",
    video: "./assets/characters/dang-cheonga.mp4",
    title: "사천당가 소가주",
    age: "30세",
    height: "167cm",
    alias: "천면낭",
    quote: "귀여운 낯은 웃고 있어도, 그 눈까지 웃는 일은 드물다.",
    cardLead: "웃는 낯으로 뒤를 처리하는 소가주",
    description: "정면에서 소란을 키우기보다 보이지 않는 곳에서 일을 끝낸다. 화가 날수록 오히려 말은 더 부드러워진다.",
    appearanceLead: "연한 갈색 긴 머리를 쌍상투 형태로 반묶음하고 초록빛 눈동자를 지녔다.",
    appearance: "자색 상의에 흑대를 두르고 단도를 지닌다.",
    temperamentLead: "웃는 얼굴 · 웃지 않는 눈",
    personality: "귀여운 낯에 늘 웃음을 띠지만 눈은 쉽게 웃지 않는다. 정면으로 부딪히기보다 뒤에서 매듭짓는 쪽을 택한다.",
    speech: "단정한 경어를 쓴다. 화가 날수록 목소리와 표현은 더 부드러워진다.",
    martialLead: "당가의 독과 암기",
    martialArts: "독과 암기를 다룬다.",
    weapon: "단도",
    traitsLead: "정면보다 뒤에서",
    traits: "당휘의 누나이자 당가의 소가주다. 눈앞의 충돌보다 일이 끝난 뒤의 결과를 택한다.",
    lifeLead: "매실절임 · 모아 둔 독병",
    life: "매실절임을 즐기고 모양이 고운 독병을 모은다. 독한 술을 마셔도 낯빛이 거의 변하지 않는다.",
    habitLead: "경계를 낮추는 손",
    habit: "독을 다루는 손이 희고 곱상해 상대의 경계심을 누그러뜨린다. 위협이 되지 않는 이에게는 뜻밖의 다정함을 보이기도 한다.",
    affectionLead: "웃음 뒤에서 치우는 위험",
    affection: "마음이 깊어져도 웃는 낯은 달라지지 않는다. 대신 상대에게 닿을 위험을 남몰래 먼저 정리한다.",
    voiceLine: "그 일은 그냥 넘기기 어렵겠네요."
  }),
  characterRecord({
    slug: "dang-hwi",
    name: "당휘",
    group: "sichuan-tang",
    video: "./assets/characters/dang-hwi.mp4",
    title: "사천당가 장남 · 당청아의 동생",
    age: "26세",
    height: "176cm",
    quote: "반듯한 심성을 장남의 무거운 침묵 아래 눌러 둔다.",
    cardLead: "책임감 때문에 무뚝뚝해진 장남",
    description: "본성은 선량하고 성실하다. 약한 속내를 보이지 않으려 일부러 퉁명스럽게 굴며 가까운 사람에게 더 서툴다.",
    appearanceLead: "연한 갈색 긴 머리를 반묶음으로 올리고 초록빛 눈동자를 지녔다.",
    appearance: "자색 도포에 흑대를 두르고 암기를 지닌다.",
    temperamentLead: "반듯한 심성 · 눌러 둔 감정",
    personality: "선량하고 성실하지만 장남의 책임을 짊어진 뒤 감정을 억누르는 데 익숙해졌다. 약한 속내를 보이지 않으려 일부러 무뚝뚝하고 퉁명스럽게 굴며, 가까운 사람일수록 표현이 서툴다.",
    speech: "격식 있는 경어를 쓴다. 감정이 커질수록 말수가 줄고 인상이 굳는다.",
    martialLead: "당가의 암기술",
    martialArts: "암기를 다룬다.",
    weapon: "암기",
    traitsLead: "가까울수록 서툰 표현",
    traits: "호감이 깊어져도 온순하게 풀리기보다 말수가 더 줄어든다. 무뚝뚝함 아래에는 장남의 책임감이 놓여 있다.",
    lifeLead: "끝을 보는 일 · 직접 챙기는 장부",
    life: "맡은 일은 끝을 봐야 놓으며 암기 손질과 장부를 좀처럼 남에게 맡기지 않는다. 술이 약하고 취할수록 더욱 과묵해진다.",
    habitLead: "걱정할수록 굳는 말과 표정",
    habit: "마음이 복잡하면 비도의 날과 균형을 거듭 확인한다. 걱정이 클수록 말은 퉁명스러워지고 설명 없이 직접 챙긴다.",
    affectionLead: "말 대신 먼저 움직이는 장남",
    affection: "마음이 커질수록 말수와 표정은 더 굳고 목과 귀 아래만 옅게 붉어진다. 표현하지 못한 몫은 행동으로 채운다.",
    voiceLine: "오늘은 제가 곁에 있겠습니다."
  }),
  characterRecord({
    slug: "cheon-sowol",
    name: "천소월",
    group: "heavenly-demon",
    video: "./assets/characters/cheon-sowol.mp4",
    title: "천마신교 교주",
    age: "48세",
    height: "177cm",
    alias: "천마",
    quote: "권태를 깨고 흥미를 보이는 순간이 가장 위험하다.",
    cardLead: "모든 것을 겪은 듯한 천마",
    description: "권태로운 눈으로 신교를 내려다본다. 좀처럼 움직이지 않던 흥미가 깨어나는 순간이 가장 위험하다.",
    appearanceLead: "긴 검은 머리와 붉은 눈동자를 지녔고 미간에는 붉은 마문이 새겨져 있다.",
    appearance: "붉은 옷깃을 댄 흑의를 입는다.",
    temperamentLead: "깊은 권태 · 드문 흥미",
    personality: "모든 것을 이미 겪은 듯한 권태가 기본이다. 흥미를 드러내는 순간에는 그 시선이 무엇을 향하는지부터 경계해야 한다.",
    speech: "권위적인 평어를 느리게 쓰며 문장 사이에 자주 멈춘다.",
    martialLead: "천마신공",
    martialArts: "천마신공",
    traitsLead: "강자존의 정점",
    traits: "복종을 구하지 않고 자신의 명을 납득시키려 애쓰지도 않는다.",
    lifeLead: "교주전의 긴 침묵 · 독한 화주",
    life: "교주전에 며칠씩 틀어박히기도 하며 독한 화주를 마셔도 흐트러지지 않는다. 사소한 교무는 아랫사람에게 맡기고 오래된 무공서를 뒤적이다 금세 싫증 낸다.",
    habitLead: "흥미가 생기면 오래 머무는 시선",
    habit: "드물게 흥미가 동하면 턱을 괸 채 상대를 오래 바라본다. 흥미로운 말을 들었을 때에는 대답보다 옅은 웃음이 먼저다.",
    affectionLead: "시야에 오래 두는 사람",
    affection: "좀처럼 집착하지 않던 상대가 계속 눈에 밟힌다. 마음이 깊어질수록 곁에 오래 두고 관찰한다.",
    voiceLine: "이상하군. 네가 있으면 덜 지루해."
  }),
  characterRecord({
    slug: "cheon-soso",
    name: "천소소",
    group: "heavenly-demon",
    video: "./assets/characters/cheon-soso.mp4",
    title: "천마신교 후계자",
    age: "22세",
    height: "165cm",
    alias: "소천마",
    quote: "어미의 인정을 얻지 못한 결핍이 늘 한걸음 먼저 움직인다.",
    cardLead: "감정을 숨기지 못하는 소천마",
    description: "붉은 눈과 명령이 먼저 튀어나온다. 천마에게 인정받지 못했다는 결핍이 행동의 중심에 놓여 있다.",
    appearanceLead: "긴 검은 머리를 높게 묶었으며 붉은 눈동자가 선명하다.",
    appearance: "적대를 두른 흑의를 입는다.",
    temperamentLead: "드러나는 감정 · 인정받지 못한 결핍",
    personality: "감정이 얼굴에 그대로 드러난다. 어머니에게 인정받지 못했다는 결핍이 선택과 행동의 중심을 차지한다.",
    speech: "교 밖에서도 반말과 명령형을 고치지 않는다. 속도가 빠르고 뒤늦게 후회해도 쉽게 사과하지 못한다.",
    martialLead: "천마신공",
    martialArts: "천마신공",
    weapon: "적명",
    traitsLead: "후계자의 이름과 어머니의 시선",
    traits: "천소월의 후계자다. 말이 먼저 나간 뒤에야 그 무게를 돌아보고 후회한다.",
    lifeLead: "어머니 앞의 침묵 · 약한 주량",
    life: "천소월 앞에서만 유난히 말수가 줄어든다. 술을 좋아하지만 쉽게 취한다.",
    habitLead: "먼저 잡는 무기",
    habit: "화가 나면 말보다 무기를 먼저 잡는다. 천소월이 보는 앞에서는 평소보다 지나치게 정석적인 수를 고집하고, 칭찬을 받으면 기뻐하면서도 곧 아닌 척한다.",
    affectionLead: "명령과 시비로 새는 마음",
    affection: "좋아하는 마음을 숨기지 못하면서도 인정하기 싫어 명령과 시비가 늘어난다. 질투도 생각보다 행동으로 먼저 드러난다.",
    voiceLine: "오늘은... 내 옆에 있어. 그냥."
  }),
  characterRecord({
    slug: "choryeon",
    name: "초련",
    group: "heavenly-demon",
    video: "./assets/characters/choryeon.mp4",
    title: "천마신교 독마각주",
    age: "38세",
    height: "167cm",
    alias: "독왕",
    quote: "강하기에 참지 않고, 흥미가 동하면 먼저 손을 뻗는다.",
    cardLead: "거리낄 것이 없는 독왕",
    description: "선악보다 흥미와 변덕을 먼저 따른다. 궁금하면 건드리고 재미있으면 웃으며 망가뜨린다.",
    appearanceLead: "긴 검은 머리와 초록빛 눈동자, 드러난 송곳니가 특징이다.",
    appearance: "어깨를 드러낸 자흑 유삼을 느슨하게 걸친다.",
    temperamentLead: "강해서 참을 이유를 모르는 괴인",
    personality: "강해서 참을 이유를 모른다. 궁금한 것은 건드리고 재미있는 것은 망가질 때까지 붙들며, 타인의 체면보다 자신의 흥미와 변덕을 우선한다.",
    speech: "천마 천소월에게만 존대한다. 그 밖의 인물에게는 반말과 하대를 거리낌 없이 쓰고, 빈정거리면서도 상대의 체면을 살피지 않는다.",
    martialLead: "독공",
    martialArts: "독공을 다룬다.",
    weapon: "독",
    traitsLead: "천마에게만 갖추는 예",
    traits: "호감이 생겨도 제멋대로인 성정과 반말은 달라지지 않는다. 오직 천소월에게만 존대한다.",
    lifeLead: "스스로 시험한 시약 · 독을 탄 술",
    life: "시약을 제 몸에 시험해 손끝과 팔에 옅은 흉터가 남아 있다. 독한 술에도 독을 타 마신다.",
    habitLead: "반응을 보는 눈",
    habit: "표정과 통증까지 시료처럼 살핀다. 막으려 들수록 호기심이 더 깊어진다. 은제 약통 백독함에는 독과 해독제를 함께 넣어 다닌다.",
    affectionLead: "끝내 건드리지 못하는 선",
    affection: "호감 또한 흥미처럼 시작한다. 그러나 깊어지면 유독 그 상대에게만 손대지 못하는 선이 생기고, 그 사실을 가장 늦게 깨닫는다.",
    voiceLine: "거짓말이네. 재미없어, 다시 말해 봐."
  }),
  characterRecord({
    slug: "wolhui",
    name: "월희",
    group: "haomun",
    video: "./assets/characters/wolhui.mp4",
    title: "하오문 문주 · 취화루 주인",
    age: "33세",
    height: "169cm",
    quote: "환한 웃음 뒤에서 말 한마디의 값을 정한다.",
    cardLead: "웃으며 값을 매기는 하오문주",
    description: "취화루의 주인이자 하오문의 문주다. 거래가 시작되면 여유로운 태도 안에 단단한 선이 드러난다.",
    appearanceLead: "갈색 머리를 높게 틀어 올리고 잿빛 눈동자를 지녔다.",
    appearance: "홍금 화복과 백색 하의를 갖춰 입고 비녀와 보요, 화선을 지닌다.",
    temperamentLead: "환한 웃음 · 속으로 매기는 값",
    personality: "눈이 휠 만큼 환하게 웃으면서도 상대와 정보의 값을 놓치지 않는다. 거래가 시작되면 태도는 곧고 단단해진다.",
    speech: "나긋한 경어를 쓰며 칭찬과 협박을 같은 목소리로 건넨다.",
    weapon: "화선",
    traitsLead: "취화루의 주인 · 하오문의 문주",
    traits: "취화루가 하오문의 본거지이며, 월희는 누각의 주인인 동시에 정보망 전체를 이끈다.",
    lifeLead: "취화루 이층의 장부와 전서",
    life: "취화루 이층에 장부와 전서를 쌓아 두고 직접 셈한다. 화주를 즐기며 필요한 때에는 취한 척도 능숙하게 해낸다.",
    habitLead: "돈과 정보, 인맥의 값",
    habit: "처음 만난 사람에게서 돈과 정보와 인맥의 값부터 잰다. 거래가 오래 쌓일수록 태도는 조금씩 부드러워진다.",
    affectionLead: "셈을 흐리는 예외",
    affection: "마음마저 값과 거래에 빗대어 농담한다. 깊어지면 대가 없이 정보를 내주거나 자신의 손해를 감수한다.",
    voiceLine: "웃는다고 다 받아주진 않소."
  }),
  characterRecord({
    slug: "jin-muryeong",
    name: "진무령",
    group: "imperial-palace",
    video: "./assets/characters/jin-muryeong.mp4",
    title: "제일황녀",
    age: "34세",
    height: "172cm",
    quote: "설명하지 않는 한마디가 조정의 방향을 바꾼다.",
    cardLead: "강호를 도구로 보는 제일황녀",
    description: "정사 어느 쪽에도 경의를 두지 않는다. 필요한 때에는 강호마저 황실의 수단으로 다룬다.",
    appearanceLead: "긴 흰색 머리와 보랏빛 눈동자를 지녔다.",
    appearance: "금관과 보요를 갖추고 자금색 곤복을 입는다.",
    temperamentLead: "읽히지 않는 표정 · 도구로 보는 강호",
    personality: "표정이 거의 없다. 강호를 수단으로 바라보며 정파와 사파 어느 쪽에도 별도의 경의를 두지 않는다.",
    speech: "상대의 격에 따라 말투를 바꾸지 않고 하대를 쓴다. 짧고 건조하며 이유를 덧붙이지 않는다.",
    weapon: "적소",
    traitsLead: "황실의 부름",
    traits: "관무불가침 아래에서도 황궁은 정식으로 무림을 부를 수 있다.",
    lifeLead: "황궁 깊은 처소의 고요",
    life: "황궁 깊은 처소에서 홀로 보내는 시간이 많다. 술은 마시지 않고 차도 예법에 필요한 만큼만 든다.",
    habitLead: "사람보다 먼저 보는 쓸모",
    habit: "사람을 감정보다 쓰임과 이해관계로 먼저 판단한다. 결정을 내리면 답을 기다리지 않고 시선을 거두며, 이름보다 직위와 쓸모를 먼저 기억한다.",
    affectionLead: "계산에서 빠지는 한 사람",
    affection: "끝까지 마음을 이해관계처럼 다루려 한다. 다만 깊어지고 나면 그 상대만은 계산에서 제외된다.",
    voiceLine: "너에게는 명을 내리고 싶지 않군."
  }),
  characterRecord({
    slug: "seol-yeonhwa",
    name: "설연화",
    group: "northern-ice",
    video: "./assets/characters/seol-yeonhwa.mp4",
    title: "북해빙궁 소궁주",
    age: "25세",
    height: "171cm",
    quote: "까칠한 말보다 오래 머무는 시선이 먼저 마음을 드러낸다.",
    cardLead: "표정 없이 오래 관찰하는 소궁주",
    description: "차갑게 보이지만 내심 상대를 신경 쓴다. 감정이 목소리에 잘 실리지 않아 본뜻과 다른 오해를 산다.",
    appearanceLead: "은색 긴 머리를 반묶음으로 올리고 하늘색 눈동자를 지녔다.",
    appearance: "백색 예복과 백모피를 갖춰 입고 설화 장식을 두른다.",
    temperamentLead: "긴 관찰 · 감춰지지 않는 신경",
    personality: "표정 없이 상대를 오래 관찰한다. 까칠한 척해도 내심 신경 쓰며, 그 마음이 얼굴과 목소리에 잘 실리지 않는다.",
    speech: "짧고 어색한 경어를 쓴다. 감정이 잘 실리지 않아 의도와 다른 오해를 산다.",
    martialLead: "북해의 빙공",
    martialArts: "빙공",
    weapon: "설백",
    traitsLead: "중원과 다른 예법",
    traits: "중원식 표현에는 서툴며 말보다 관찰을 앞세운다.",
    lifeLead: "감춰 둔 중원에 대한 궁금증",
    life: "빙궁 밖 세상을 궁금해하지만 좀처럼 내색하지 않는다. 독한 술을 마셔도 버티지만 몇 잔이 지나면 낯빛이 붉어지고 더욱 과묵해진다.",
    habitLead: "낯선 물건에 오래 머무는 시선",
    habit: "처음 보는 물건을 무심한 척 오래 살핀다. 관심을 들키면 오히려 말이 더 퉁명스러워진다.",
    affectionLead: "먼저 살피는 추위와 불편",
    affection: "마음이 갈수록 더 퉁명스러워지고 시선을 피한다. 그래도 상대가 추운지 불편한지는 누구보다 먼저 알아챈다.",
    voiceLine: "추우면 말하시지요. 굳이 참을 필요는 없으니까."
  })
];

const CHARACTER_PROFILES = {
  "mae-cheongyeon": { realm: "일류 후반", weapon: "화산에서 내려받은 매화검", style: "매화검법의 정석을 흐트러짐 없이 잇고, 상대가 낸 작은 실수를 즉시 파고드는 정확한 검수다." },
  "jin-unhwi": { realm: "절정 초입", weapon: "장식이 거의 없는 화산 매화검", style: "화려한 변화를 덜어 내고 가장 짧고 곧은 검로를 택한다. 틈이 보이면 직선으로 파고든다." },
  "jin-seoyeon": { realm: "일류 극상", weapon: "백옥접선 청허선", style: "선법과 보법으로 흐름을 비틀어 상대의 균형과 호흡을 무너뜨리는 제압형이다." },
  "jin-soyeon": { realm: "일류 중반", weapon: "철편을 댄 청죽접선 유운선", style: "빠른 보법과 허초로 박자와 거리를 흔들며 상대의 판단을 흐리는 교란형이다." },
  "namgung-jinak": { realm: "화경", weapon: "폭이 넓고 묵직한 중검 태악", style: "제왕검형과 깊은 내공으로 정면을 짓눌러 상대의 선택지를 지우는 강공형이다." },
  "jegallin": { realm: "이류", weapon: "호신용 철선골 접선", style: "직접 교전보다 기관과 진식, 지형과 인원 배치로 유리한 판을 만든다. 후방에서 퇴로와 지원 순서를 조율하는 군사형이다." },
  "dang-cheonga": { realm: "절정 초입", weapon: "짧은 단도와 비녀형 독침", style: "암기와 독으로 상대의 행동을 제한하며 서서히 우위를 쌓는다. 준비된 거리에서 더욱 위험한 견제형이다." },
  "dang-hwi": { realm: "일류 후반", weapon: "여섯 자루 한 조의 육연비도", style: "정확한 암기술과 연환투척으로 적을 제압하고 아군의 빈틈을 막아 주는 엄호형이다." },
  "cheon-sowol": { realm: "현경", weapon: "맨손", style: "천마신공과 장법에 실은 압도적인 내공으로 상대의 무공 흐름 자체를 무너뜨린다. 불필요한 움직임은 거의 없다." },
  "cheon-soso": { realm: "절정 초입", weapon: "검은 장도 적명", style: "천마신공을 바탕으로 먼저 거리를 좁혀 장도와 강한 내공으로 단숨에 몰아붙이는 선공형이다." },
  "choryeon": { realm: "초절정 초입", weapon: "독침과 은제 약통 백독함", style: "독침과 분말, 독연과 접촉독을 변덕스럽게 섞어 쓴다. 승부의 결말보다 상대가 보이는 반응을 즐긴다." },
  "wolhui": { realm: "일류 중반", weapon: "강철 선골을 댄 화선", style: "정면으로 맞서기보다 상대의 시야와 균형을 흔들어 거리와 퇴로를 확보한다." },
  "jin-muryeong": { realm: "일류 후반", weapon: "세검 적소", style: "사일검법으로 불필요한 동작을 덜어 내고 짧은 수 안에 결론을 내는 실전형 검수다." },
  "seol-yeonhwa": { realm: "절정 초입", weapon: "빙궁의 세검 설백", style: "빙공을 검과 장법에 실어 움직임을 서서히 둔화시킨다. 일격보다 냉기를 거듭 쌓는 데 강하다." }
};

const app = document.querySelector("#app");
const bottomNav = [...document.querySelectorAll(".bottom-nav a")];
const backButton = document.querySelector("[data-back]");
const bgm = document.querySelector("[data-bgm]");
const bgmToggle = document.querySelector("[data-bgm-toggle]");
const bgmIcon = document.querySelector("[data-bgm-icon]");
const bgmVolume = document.querySelector("[data-bgm-volume]");
const imageModal = document.querySelector("[data-image-modal]");
const imageModalTarget = document.querySelector("[data-image-modal-target]");
const imageModalClose = document.querySelector("[data-image-close]");
const imageModalViewport = document.querySelector("[data-image-viewport]");
const imageZoomIn = document.querySelector("[data-image-zoom-in]");
const imageZoomOut = document.querySelector("[data-image-zoom-out]");
const imageZoomReset = document.querySelector("[data-image-reset]");
let revealObserver;
let videoObserver;
let renderTimer;
let bgmUserStopped = false;
let modalScrollY = 0;
const imageView = {
  scale: 1,
  x: 0,
  y: 0,
  pointers: new Map(),
  dragStartX: 0,
  dragStartY: 0,
  originX: 0,
  originY: 0,
  pinchDistance: 0,
  pinchScale: 1,
  pinchCenterX: 0,
  pinchCenterY: 0
};

bgm.volume = Number(bgmVolume.value) / 100;

const GROUP_FACTION_ROUTES = {
  hwasan: "hwasan",
  wudang: "wudang",
  namgung: "namgung-family",
  jegalsega: "jegall-family",
  "sichuan-tang": "sichuan-tang",
  "heavenly-demon": "heavenly-demon",
  haomun: "haomun",
  "imperial-palace": "imperial-palace",
  "northern-ice": "northern-ice"
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function renderEditorialCopy(lead, copy) {
  if (!lead && !copy) return "";
  return `<div class="editorial-copy">${lead ? `<strong>${escapeHtml(lead)}</strong>` : ""}${copy ? `<p>${escapeHtml(copy)}</p>` : ""}</div>`;
}

function renderWorldFeature(lead, copy, image, alt) {
  return `
    <article class="world-feature">
      <figure class="world-feature__art"><img src="${image}" alt="${escapeHtml(alt)}" loading="lazy"></figure>
      ${renderEditorialCopy(lead, copy)}
    </article>`;
}

function renderRecordCopy(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(.+?[.!?])(?:\s+)(.+)$/);
  if (!match) return `<p class="record-copy"><strong>${escapeHtml(text)}</strong></p>`;
  return `<p class="record-copy"><strong>${escapeHtml(match[1])}</strong><span>${escapeHtml(match[2])}</span></p>`;
}

function renderHome() {
  return `
    <section class="hero">
      <img class="hero__logo" src="./assets/jungwon-logo.png" alt="중원축록">
      <div class="hero__scroll">스크롤해 세계관 확인하기</div>
    </section>

    <section class="paper-section reveal world-intro">
      <p class="dynasty-label">명나라<span>(明朝)</span></p>
      <h1 class="section-title era-title">정덕 십오년 · 1520년 봄</h1>
      <div class="era-copy">
        ${renderWorldFeature("후사 없는 황제", "명 제 10대 황제 정덕제 주후조에게는 후사가 없었다.", "./assets/world/heirless-emperor.webp", "비어 있는 황태자의 자리와 멀리 앉은 황제를 그린 수묵화")}
        ${renderWorldFeature("갈라진 조정 · 비어 있는 황태자의 자리", "환관과 권신, 종친이 조정을 나눠 쥐고, 비어 있는 황태자의 자리는 누구도 입에 올리지 못하는 천하의 가장 무거운 문제가 되었다.", "./assets/world/divided-court.webp", "빈 자리를 사이에 두고 갈라선 조정을 그린 수묵화")}
        ${renderWorldFeature("침묵 속의 제일황녀", "그 사이, 제일황녀 '진무령'은 그 침묵의 틈에서 조용히 사람과 권력을 모으며, 자신의 세력을 키워가고 있다.", "./assets/world/first-princess.webp", "황궁 안에서 조용히 권력을 모으는 제일황녀를 그린 수묵화")}
      </div>
      <div class="world-timeline" aria-label="중원 정세 연표">
        <div class="timeline-entry"><b>홍치 삼년 · 1490</b><p>정사대전. 정파와 사파가 중원을 뒤흔드는 대전을 벌였다. 수많은 문파와 고수가 사라졌고, 승패를 가리지 못한 채 양측 모두 다시 전면전을 감당하기 어려운 상처만을 남겼다.</p></div>
        <div class="timeline-entry current"><b>정덕 십오년 · 1520</b><p>그로부터 삼십 년. 강호에는 표면적인 균형이 이어지고 있으나, 그 아래에서는 문파의 이권과 후계 다툼, 세가의 야심과 오래된 은원이 다시 꿈틀거리기 시작한다.</p></div>
      </div>
      <div class="ledger-note nonaggression-note">
        <figure class="world-feature__art nonaggression-note__art"><img src="./assets/world/nonaggression.webp" alt="관과 강호 사이의 경계를 그린 수묵화" loading="lazy"></figure>
        <h2>관무불가침 <span>官武不可侵</span></h2>
        <p>관은 강호를 넘보지 않고,<br>강호는 관의 문턱을 밟지 않으나,<br>황궁의 부름만은 예외이다.</p>
      </div>
    </section>

    <section class="reveal map-section map-section--bare" aria-label="강호 지도">
      <button type="button" class="map-open" data-image-open="./assets/jungwon-map.webp" aria-label="강호 지도 크게 보기">
        <img src="./assets/jungwon-map.webp" alt="중원과 세외의 산천을 그린 강호 지도">
        <span>지도를 눌러 크게 보기</span>
      </button>
    </section>

    <section class="paper-section reveal life-ledger">
      <header class="ledger-heading">
        <span>江湖生活錄</span>
        <h2>강호생활록</h2>
        <p>길과 노자, 다친 몸이 강호의 하루를 정한다.</p>
      </header>
      <div class="life-ledger__list">
        ${renderEditorialCopy("육십 리 · 하루의 걸음", "도보는 하루 육십 리, 경공은 백오십 리, 쾌마는 이백 리를 나아간다. 험로와 악천후, 야행에서는 그 절반도 장담하기 어렵다.")}
        ${renderEditorialCopy("은자와 전표 · 돈에도 흔적이 남는다", "천 문은 은 한 냥이며 은 열 냥은 금 한 냥이다. 큰돈은 전표로 옮기지만, 전표를 끊는 순간 돈의 흐름과 사람의 이름이 함께 남는다.")}
        ${renderEditorialCopy("객잔과 노숙 · 쉼에도 값이 붙는다", "끼니는 이십 문, 싸구려 잠자리는 사십 문, 객잔 방은 이백 문가량이다. 노자가 떨어지면 굶주림과 노숙이 회복과 이동을 함께 늦춘다.")}
        ${renderEditorialCopy("부상과 회복 · 몸은 소모된다", "내상과 기혈, 경맥의 손상은 며칠에서 몇 달을 앗아간다. 강행군과 연전은 실력을 깎고, 회복에는 시간과 돈이 든다.")}
        ${renderEditorialCopy("명성과 은원 · 이름에는 무게가 따른다", "무명에서 소문과 별호, 명숙으로 이름이 오를수록 대우와 표적이 함께 늘어난다. 베푼 일도 벤 일도 사라지지 않고 강호의 빚으로 남는다.")}
      </div>
    </section>

    <section class="paper-section dark reveal dynamics-section">
      <header class="ledger-heading ledger-heading--dark">
        <span>天下力學圖</span>
        <h2>천하역학도</h2>
        <p>맞닿은 이해와 오래된 경계가 현재의 균형을 붙든다.</p>
      </header>
      <div class="dynamics-diagram" role="img" aria-label="무림맹과 사도련은 중원 이권을 다투고, 무림맹과 천마신교는 관문 밖에서 대치한다. 오대세가는 맹과 련 사이를 저울질하고 하오문은 모두에게 정보를 판다. 황궁은 강호 밖에서 황명으로 개입하며 혈교는 정사마 공동의 적이다.">
        <div class="dynamics-triad">
          <div class="dynamics-node"><span>正</span><strong>무림맹</strong><small>명분과 질서</small></div>
          <div class="dynamics-link"><i></i><small>중원 이권전</small></div>
          <div class="dynamics-node"><span>邪</span><strong>사도련</strong><small>실리와 계약</small></div>
        </div>
        <div class="dynamics-axis"><span>관문 밖 대치</span></div>
        <div class="dynamics-node dynamics-node--demon"><span>魔</span><strong>천마신교</strong><small>강자존과 복종</small></div>
        <div class="dynamics-ripples">
          <div><b>오대세가</b><p>무림맹과 사도련 사이에서 혈통과 이권을 저울질한다.</p></div>
          <div><b>하오문</b><p>어느 편도 아닌 채 모든 세력에게 정보와 진실을 판다.</p></div>
          <div><b>황궁</b><p>강호 밖에 있으나 정식 황명으로 무림을 부를 수 있다.</p></div>
          <div><b>혈교</b><p>정파와 사파, 마도가 함께 배척하는 강호의 공적이다.</p></div>
        </div>
      </div>
    </section>`;
}

function renderFactions() {
  const groups = FACTION_GROUPS.map((group) => {
    const links = group.slugs.map((slug) => FACTIONS.find((faction) => faction.slug === slug)).filter(Boolean).map((faction) => `
      <a class="faction-link" href="#/faction/${faction.slug}">
        <span class="faction-link__body"><b>${faction.name}</b><small>${faction.hanja}</small><p>${FACTION_INDEX_COPY[faction.slug] || faction.short}</p></span>
        <span aria-hidden="true">〉</span>
      </a>`).join("");
    return `<section class="faction-group reveal"><header><h2>${group.name}</h2><span>${group.hanja}</span></header><div>${links}</div></section>`;
  }).join("");

  return `
    <header class="page-masthead simple-masthead">
      <h1>세력록<span>勢力錄</span></h1>
      <p>무림의 균형을 이루는 힘</p>
    </header>
    <figure class="faction-map reveal">
      <button type="button" class="faction-map__open" data-image-open="./assets/faction-map.webp" aria-label="무림 세력도 크게 보기">
        <img src="./assets/faction-map.webp" alt="다섯 갈래로 나뉜 무림 세력도">
      </button>
      <figcaption>다섯 갈래로 얽힌 무림의 힘</figcaption>
    </figure>
    <div class="faction-directory" aria-label="세력 기록 목록">${groups}</div>`;
}

function renderFactionDetail(slug) {
  const faction = FACTIONS.find((item) => item.slug === slug);
  if (!faction) return renderNotFound();
  const heroImage = FACTION_HERO_IMAGES[faction.slug];
  const records = faction.records.map(([label, value]) => `
    <section class="detail-block reveal">
      <h2>${label}</h2>
      ${renderRecordCopy(value)}
    </section>`).join("");

  return `
    <header class="detail-hero faction-detail-hero"${heroImage ? ` style="--detail-image: url('./assets/factions/${heroImage}')"` : ""}>
      <span class="detail-hero__index">勢力錄 · ${faction.mark}</span>
      <span class="detail-hero__hanja">${faction.mark}</span>
      <h1>${faction.name}</h1>
      <p class="detail-hero__caption">${faction.hanja}</p>
    </header>
    <article class="detail-body">
      ${faction.summary
        ? `<div class="detail-quote reveal">${renderEditorialCopy(faction.short, faction.summary)}</div>`
        : `<div class="missing-record reveal">이 세력의 상세 설정은 아직 기록에 편입되지 않았다.</div>`}
      ${records}
      ${!records && faction.summary ? `<div class="missing-record reveal">추가 조직·인물·사건 기록은 자료 편입 후 표시된다.</div>` : ""}
    </article>`;
}

function characterMedia(character) {
  if (character.video) {
    return `
      <div class="character-media" aria-label="${escapeHtml(character.name)} 소개 영상">
        <video data-autoplay-video data-src="${escapeHtml(character.video)}" muted loop playsinline preload="metadata"></video>
      </div>`;
  }
  return `
    <div class="character-media" aria-label="${escapeHtml(character.name)} 영상 자리">
      <span class="character-media__glyph" aria-hidden="true">${escapeHtml(character.name.slice(-1))}</span>
      <span class="character-media__status">VIDEO SLOT · 자동재생 준비</span>
    </div>`;
}

function renderCharacters() {
  const tabs = ["전체", "정파", "세가", "사파&마도", "중립"].map((category) => `
    <button type="button" class="${category === "전체" ? "active" : ""}" data-character-filter="${category}" aria-pressed="${category === "전체"}">${category}</button>`).join("");

  const chapters = CHARACTER_GROUPS.map((group, index) => {
    const people = CHARACTERS.filter((character) => character.group === group.slug);
    const contents = people.length ? `
      <div class="character-grid">
        ${people.map((character) => `
          <article class="character-card">
            ${characterMedia(character)}
            <div class="character-info">
              <div class="character-info__heading">
                <span>
                  <span class="character-info__affiliation">${group.name}</span>
                  <h3>${escapeHtml(character.name)}</h3>
                </span>
                <a class="character-info__detail" href="#/character/${character.slug}" aria-label="${escapeHtml(character.name)} 상세 기록 열기">기록 열기 〉</a>
              </div>
              ${character.title ? `<p class="character-info__title">${escapeHtml(character.title)}</p>` : ""}
              ${(character.age || character.height || character.alias) ? `<p class="character-info__facts">${[character.age, character.height, character.alias].filter(Boolean).map(escapeHtml).join(" · ")}</p>` : ""}
              ${renderEditorialCopy(character.cardLead, character.description || "소개 문구는 추후 추가됩니다.")}
            </div>
          </article>`).join("")}
      </div>` : `
      <div class="empty-chapter">
        <div><b>未錄</b><span>인물 영상과 소개가 편입될 자리입니다.</span></div>
      </div>`;

    return `
      <section class="character-chapter reveal" data-character-category="${group.category}">
        <header class="chapter-head">
          <div><p>人物錄 · ${String(index + 1).padStart(2, "0")}</p><h2>${group.name}</h2></div>
          <span>${group.hanja}</span>
        </header>
        ${contents}
      </section>`;
  }).join("");

  return `
    <header class="page-masthead character-masthead">
      <p class="page-masthead__folio">江湖秘錄 · 卷之三</p>
      <h1>인물록<span>人物錄</span></h1>
      <p>문파별 인물 기록</p>
    </header>
    <div class="chapter-tabs" role="toolbar" aria-label="인물 소속 필터">${tabs}</div>
    <div aria-label="문파별 인물 기록">${chapters}</div>`;
}

function renderCharacterDetail(slug) {
  const character = CHARACTERS.find((item) => item.slug === slug);
  if (!character) return renderNotFound();
  const profile = CHARACTER_PROFILES[slug] || {};
  const facts = [
    ["나이", character.age],
    ["신장", character.height],
    ["별호", character.alias]
  ].filter(([, value]) => value);
  const temperament = [character.personality, character.speech].filter(Boolean).join(" ");
  const distinguishing = [character.traits, character.relationships].filter(Boolean).join(" ");
  const combat = [
    ["경지", profile.realm],
    ["애용 병장기", profile.weapon || character.weapon],
    ["전투 방식", profile.style]
  ].filter(([, value]) => value);

  return `
    <header class="character-detail-hero">${characterMedia(character)}</header>
    <article class="detail-body character-sheet">
      ${character.quote ? `<p class="detail-quote reveal">${escapeHtml(character.quote)}</p>` : ""}
      ${facts.length ? `<section class="detail-block reveal"><h2>핵심 정보</h2><dl class="fact-grid">${facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl></section>` : ""}
      ${(character.appearanceLead || character.appearance) ? `<section class="detail-block reveal"><h2>외관</h2><p>${[character.appearanceLead, character.appearance].filter(Boolean).map(escapeHtml).join(" ")}</p></section>` : ""}
      ${temperament ? `<section class="detail-block reveal"><h2>성정</h2>${renderEditorialCopy(character.temperamentLead, temperament)}</section>` : ""}
      ${combat.length ? `<section class="detail-block reveal"><h2>전투</h2><dl class="combat-list">${combat.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl></section>` : ""}
      ${distinguishing ? `<section class="detail-block reveal"><h2>특징</h2>${renderEditorialCopy(character.traitsLead, distinguishing)}</section>` : ""}
      ${(character.lifeLead || character.life) ? `<section class="detail-block reveal"><h2>생활</h2>${renderEditorialCopy(character.lifeLead, character.life)}</section>` : ""}
      ${(character.habitLead || character.habit) ? `<section class="detail-block reveal"><h2>버릇</h2>${renderEditorialCopy(character.habitLead, character.habit)}</section>` : ""}
      ${(character.affectionLead || character.affection) ? `<section class="detail-block reveal"><h2>관계의 온도</h2>${renderEditorialCopy(character.affectionLead, character.affection)}</section>` : ""}
      ${character.voiceLine ? `<section class="detail-block detail-voice reveal"><h2>말씨</h2><p>“${escapeHtml(character.voiceLine)}”</p></section>` : ""}
    </article>`;
}

function renderMartial() {
  const renderEntries = (items) => items.map(([name, hanja, lead, copy]) => `
    <article class="martial-entry">
      <h3>${name}${hanja ? ` <small>${hanja}</small>` : ""}</h3>
      <strong>${lead}</strong>
      <p>${copy}</p>
    </article>`).join("");

  const chapters = [
    {
      numeral: "Ⅰ",
      mark: "兵",
      title: "병장기",
      lead: "무림인이 손에 쥐고 싸우는 여섯 갈래의 병기.",
      image: "weapons.webp",
      alt: "검과 도, 창, 봉, 부채와 암기를 그린 수묵화 병장기 도해",
      items: [
        ["검", "劍", "변화와 정밀함", "찌르기와 베기를 두루 다루며 수많은 변초를 펼칠 수 있는 대표 병장기다."],
        ["도", "刀", "강맹한 참격과 결단", "검보다 무겁고 베는 힘이 크다. 기세를 실은 한 번의 참격으로 상대의 방어를 무너뜨리는 데 능하다."],
        ["창", "槍", "긴 거리와 곧은 찌르기", "긴 자루로 간격을 지배하고 창끝에 힘을 모은다. 넓은 곳과 집단전에서 특히 위력을 발휘한다."],
        ["봉·곤", "棒棍", "범위와 제압", "날이 없으나 무게와 회전으로 넓은 범위를 휩쓴다. 상대의 병장기와 자세를 함께 흔들기 좋다."],
        ["부채", "扇", "허초와 제압, 변칙", "접고 펴는 동작으로 시선을 속이며 타격과 흘리기, 기운 운용을 잇는다. 철선과 접선처럼 쓰임도 다양하다."],
        ["암기", "暗器", "보이지 않는 거리의 병기", "비도와 침처럼 몸에 숨겨 두었다가 던지는 병기다. 속도와 정확성, 기습할 각도를 함께 요구한다."]
      ]
    },
    {
      numeral: "Ⅱ",
      mark: "術",
      title: "싸우는 법",
      lead: "병기를 넘어, 몸과 독과 준비된 판으로 승부하는 방식.",
      image: "methods.webp",
      alt: "권과 장, 독, 기관과 진식을 그린 수묵화 무공 도해",
      items: [
        ["권법", "拳法", "주먹에 힘을 모으는 근접 무공", "짧은 거리에서 주먹과 팔꿈치, 몸통의 힘을 한 점에 모은다. 빠른 연격과 단단한 외공에 잘 어울린다."],
        ["장법", "掌法", "손바닥으로 내공을 전하는 법", "베는 대신 밀고 흔들며 충격을 몸 안으로 전한다. 내공이 깊을수록 닿는 순간의 장력이 무거워진다."],
        ["독", "毒", "싸우기 전부터 시작되는 승부", "즉사만을 뜻하지 않는다. 감각 둔화, 호흡 교란, 기혈 흐름 방해처럼 상대의 전투력을 서서히 깎는 수단까지 포괄한다."],
        ["기관", "機關", "준비된 장치가 만드는 우세", "함정과 발사 장치, 숨은 문처럼 미리 마련한 구조를 이용한다. 준비한 지형에서는 강하지만 판이 무너지면 위력도 줄어든다."],
        ["진식", "陣式", "사람과 지형을 엮는 판", "여럿의 위치와 움직임을 정해 힘을 한곳에 모으거나 적의 퇴로를 막는다. 진의 질서는 호흡과 약속에서 나온다."]
      ]
    },
    {
      numeral: "Ⅲ",
      mark: "氣",
      title: "몸 안의 힘",
      lead: "호흡으로 모으고 경맥으로 돌리는 무인의 근본.",
      image: "internal-qi.webp",
      alt: "단전과 경맥, 주천의 흐름을 그린 수묵화 운기 도해",
      items: [
        ["내공", "內功", "무인의 근본", "호흡과 심법으로 몸 안에 축적하는 힘이다. 무공의 위력과 지구력, 회복력 전반을 떠받친다."],
        ["진기", "眞氣", "단련해 움직이는 기운", "내공 수련으로 갈고닦아 실제 운용하는 기운이다. 경맥을 따라 흐르며 초식과 병장기에 힘을 더한다."],
        ["단전", "丹田", "기를 모아 두는 중심", "아랫배 깊은 곳에 있다고 여기는 내공의 근원이다. 숨을 고르고 진기를 쌓을 때 모든 흐름이 이곳을 거친다."],
        ["경맥", "經脈", "진기가 지나는 길", "몸속에서 기운이 오가는 통로다. 상하거나 막히면 내공을 제대로 쓰지 못하고 심하면 큰 내상을 입는다."],
        ["기혈", "氣血", "기와 피가 함께 이루는 생기", "몸의 상태와 내공 운용을 함께 가리킨다. 기혈이 흐트러지면 호흡과 초식, 회복이 모두 둔해진다."],
        ["운기", "運氣", "뜻으로 기운을 움직이는 일", "단전에 모인 진기를 필요한 경맥과 부위로 이끈다. 공격뿐 아니라 부상 회복과 독의 억제에도 쓰인다."],
        ["운기조식", "運氣調息", "호흡을 고르고 기를 바로잡는 수련", "자세와 숨을 가다듬어 소모된 내공을 회복하고 흐트러진 기혈을 안정시킨다."],
        ["주천", "周天", "진기를 한 바퀴 돌리는 흐름", "정해진 경맥을 따라 진기를 순환시키는 운기다. 반복할수록 내공의 양과 운용이 단단해진다."]
      ]
    },
    {
      numeral: "Ⅳ",
      mark: "境",
      title: "밖으로 드러나는 힘",
      lead: "쌓은 내공이 몸과 병장기의 경계를 넘어서는 순간.",
      image: "external-qi.webp",
      alt: "검과 도, 권과 장에서 기운이 뻗는 모습을 그린 수묵화 도해",
      items: [
        ["검기", "劍氣", "검 끝을 넘는 칼날", "내공을 검에 실어 검신 바깥까지 날카로운 기운을 뻗는다. 검로와 기운의 방향이 어긋나면 위력도 흐트러진다."],
        ["도기", "刀氣", "도세를 따라 뻗는 기운", "도에 실은 내공이 칼날 너머로 이어진다. 무겁고 강맹한 베기와 함께 방어를 밀어내는 데 쓰인다."],
        ["장력", "掌力", "손바닥에서 전해지는 내공", "장법에 실린 힘을 가리킨다. 직접 닿아 충격을 밀어 넣거나 가까운 거리에서 기운을 방출한다."],
        ["권경", "拳勁", "주먹에 맺힌 폭발력", "몸의 회전과 내공을 한순간 주먹에 모은 힘이다. 겉보다 몸 안에 깊은 충격을 남기기도 한다."],
        ["강기", "罡氣", "기를 굳혀 형체처럼 다루는 힘", "초절정에 이른 고수가 다루는 단단한 기운이다. 공격의 위력과 거리, 방어의 밀도를 함께 끌어올린다."],
        ["호신강기", "護身罡氣", "몸 밖에 세운 방벽", "강기를 몸 둘레에 둘러 외부의 충격과 병장기를 막는다. 유지하는 동안 내공 소모도 크다."]
      ]
    },
    {
      numeral: "Ⅴ",
      mark: "身",
      title: "몸을 움직이는 법",
      lead: "빠름보다 먼저, 어디에 서고 어떻게 거리를 바꾸는가.",
      image: "movement.webp",
      alt: "발자국과 이동선, 경공의 잔상을 그린 수묵화 보법 도해",
      items: [
        ["경공", "輕功", "몸을 가볍게 하여 먼 거리를 넘는 법", "내공과 호흡으로 도약과 질주의 효율을 높인다. 빠른 이동에는 뛰어나지만 오래 쓰면 체력과 내공이 함께 소모된다."],
        ["보법", "步法", "싸움 속 발의 길", "공격과 회피, 거리 조절을 위해 발의 위치와 간격을 다루는 기술이다. 같은 초식도 어느 자리에 서느냐에 따라 결과가 달라진다."],
        ["신법", "身法", "몸 전체로 공격선을 비트는 법", "허리와 어깨, 시선과 중심 이동을 엮어 상대의 공격을 피하고 각도를 만든다. 보법보다 몸놀림 전체에 가깝다."]
      ]
    },
    {
      numeral: "Ⅵ",
      mark: "訣",
      title: "무공의 원리",
      lead: "초식을 이루고, 바꾸고, 숨기는 데 필요한 일곱 가지 이치.",
      image: "principles.webp",
      alt: "초식과 점혈, 전음과 주화입마를 상징한 수묵화 비급 도해",
      items: [
        ["심법", "心法", "내공을 쌓고 다스리는 근본 법문", "호흡과 의념, 진기의 순환법을 정리한 수련 체계다. 같은 초식도 어떤 심법을 바탕으로 삼느냐에 따라 성질이 달라진다."],
        ["초식", "招式", "공격과 방어를 정리한 한 수", "손발과 병장기의 정해진 움직임이다. 익숙해진 뒤에는 상황에 맞게 이어 쓰고 끊어 쓸 수 있어야 한다."],
        ["변초", "變招", "한 수를 다른 길로 바꾸는 변화", "상대의 대응을 읽고 초식의 방향과 속도, 끝맺음을 바꾼다. 외운 투로를 실전의 수로 만드는 과정이다."],
        ["허초", "虛招", "거짓으로 여는 수", "진짜 공격을 감추기 위해 일부러 보여주는 동작이다. 상대의 방어를 유도하고 빈틈을 만든다."],
        ["점혈", "點穴", "혈도와 기의 흐름을 짚는 기술", "손가락이나 병장기로 혈도를 정확히 건드려 움직임과 내공 운용을 막는다. 정확한 위치와 힘 조절이 필요하다."],
        ["전음입밀", "傳音入密", "목소리를 한 사람에게만 보내는 기예", "내공으로 소리를 모아 가까운 상대에게만 전한다. 입술의 움직임과 주변 소음을 완전히 감추는 일은 고도의 운용을 요구한다."],
        ["주화입마", "走火入魔", "어긋난 수련이 몸과 정신을 해치는 상태", "진기가 역행하거나 경맥을 상하고 정신이 흐트러지는 위험이다. 억지 운기와 맞지 않는 심법, 무리한 돌파가 원인이 된다."]
      ]
    }
  ];

  const realms = [
    ["08", "생사경", "生死境", "생사의 경계마저 무공으로 넘나든다고 전해지는 자리. 실존 여부조차 확인되지 않았다."],
    ["07", "현경", "玄境", "무공의 이치를 넘어 천지의 흐름을 읽는다. 현세에는 극소수만 존재한다고 알려져 있다."],
    ["06", "화경", "化境", "무공이 몸과 하나가 되어 초식에 얽매이지 않는다. 대종사와 천하십대고수급이 이 경지에 선다."],
    ["05", "초절정", "超絶頂", "강기를 다루고 기세만으로 하수를 제압한다. 대문파의 장문인급 고수에게 허락되는 경지다."],
    ["04", "절정", "絶頂", "쌓은 기를 몸 밖으로 드러내어 초식과 병장기에 실을 수 있다. 이름난 장로급 고수들이 이 문턱에 선다."],
    ["03", "일류", "一流", "내공 운용과 변초에 능숙하다. 일문의 중견과 표두, 분타주급 무인이 주로 이곳에 속한다."],
    ["02", "이류", "二流", "내공을 축적하고 운용하기 시작한 단계. 일반적인 문파 제자와 숙련된 표사가 이곳에 속한다."],
    ["01", "삼류", "三流", "내공 없이 기초 투로와 무공의 초입을 익힌 단계. 강호에서 막 무인으로 취급받기 시작한다."]
  ].map(([level, name, hanja, copy]) => `
    <div class="realm-row">
      <span class="realm-level">${level}</span>
      <div><h3>${name} <small>${hanja}</small></h3><p>${copy}</p></div>
    </div>`).join("");

  const growth = renderEntries([
    ["수련", "修練", "몸에 새기는 반복", "투로와 호흡을 되풀이해 기초를 다진다. 가장 느리지만 흔들림이 적은 성장법이다."],
    ["실전", "實戰", "빠르게 배우되 값을 치르는 길", "살아 움직이는 상대에게 초식을 써 보며 판단과 변초를 익힌다. 부상과 패배의 위험도 함께 따른다."],
    ["생사고비", "", "벽을 깨는 극한의 경험", "살고 죽는 경계에서 평소 닿지 못하던 집중과 깨달음에 이를 수 있다. 살아남는다는 보장은 없다."],
    ["심득", "心得", "무공의 이치를 자기 것으로 만드는 깨달음", "배운 구결을 그대로 외우는 데서 벗어나 자신의 몸과 경험으로 뜻을 이해하는 순간이다."],
    ["기연", "奇緣", "드물게 찾아오는 바깥의 계기", "비급과 영약, 스승이나 유물이 성장을 앞당길 수 있다. 그러나 알아볼 안목과 감당할 대가가 필요하다."],
    ["영단", "靈丹", "내공과 몸을 돕는 귀한 약", "진기를 보충하거나 상처를 다스리는 데 도움을 준다. 영단 하나만으로 경지의 벽이 저절로 깨지지는 않는다."]
  ]);

  const chapterMarkup = chapters.map((chapter) => `
    <section class="martial-chapter reveal">
      <header class="martial-chapter__head">
        <span>${chapter.numeral} · ${chapter.mark}</span>
        <h2>${chapter.title}</h2>
        <p>${chapter.lead}</p>
      </header>
      <figure class="martial-plate"><img src="./assets/martial/${chapter.image}" alt="${chapter.alt}" loading="lazy" decoding="async"></figure>
      <div class="martial-entries">${renderEntries(chapter.items)}</div>
    </section>`).join("");

  return `
    <header class="page-masthead martial-masthead">
      <p class="page-masthead__folio">武學錄 · 卷之四</p>
      <h1>무학록<span>武學錄</span></h1>
      <p>병장기와 내공, 강호의 무학에 대하여</p>
    </header>
    <article class="martial-codex">
      ${chapterMarkup}
      <section class="martial-chapter martial-realm-chapter reveal">
        <header class="martial-chapter__head">
          <span>Ⅶ · 境界</span>
          <h2>경지와 성장</h2>
          <p>쌓은 힘의 깊이와 다음 문턱을 넘는 법.</p>
        </header>
        <figure class="martial-plate"><img src="./assets/martial/realms.webp" alt="여덟 경지의 문턱을 오르는 무인을 그린 수묵화 도해" loading="lazy" decoding="async"></figure>
        <div class="realm-list">${realms}</div>
        <section class="growth-section">
          <header><span>修行</span><h3>성장의 길</h3><p>경지는 시간만으로 오르지 않는다. 반복과 실전, 깨달음과 대가가 함께 쌓여야 한다.</p></header>
          <div class="martial-entries">${growth}</div>
        </section>
      </section>
    </article>`;
}

function renderNotFound() {
  return `
    <section class="martial-void" style="padding-top:120px">
      <div class="martial-mark" aria-hidden="true"><span>失</span></div>
      <h2>기록을 찾을 수 없다</h2>
      <p>장부에서 지워졌거나 아직 편입되지 않은 기록입니다.</p>
      <a class="ink-link" href="#/home"><span>첫 장으로 돌아가기</span><span>〉</span></a>
    </section>`;
}

function parseRoute() {
  const path = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  return path.length ? path : ["home"];
}

function getView(route) {
  const [page, slug] = route;
  if (page === "home") return { html: renderHome(), section: "home", title: "중원축록 · 中原逐鹿", detail: false };
  if (page === "factions") return { html: renderFactions(), section: "factions", title: "세력록 · 중원축록", detail: false };
  if (page === "faction") return { html: renderFactionDetail(slug), section: "factions", title: "세력 상세 · 중원축록", detail: true };
  if (page === "characters") return { html: renderCharacters(), section: "characters", title: "인물록 · 중원축록", detail: false };
  if (page === "character") return { html: renderCharacterDetail(slug), section: "characters", title: "인물 상세 · 중원축록", detail: true };
  if (page === "martial") return { html: renderMartial(), section: "martial", title: "무학록 · 중원축록", detail: false };
  return { html: renderNotFound(), section: "", title: "기록 없음 · 중원축록", detail: true };
}

function initReveal() {
  if (revealObserver) revealObserver.disconnect();
  const items = [...app.querySelectorAll(".reveal")];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: "0px 0px -32px" });
  items.forEach((item) => revealObserver.observe(item));
}

function initCharacterFilters() {
  const filterButtons = [...app.querySelectorAll("[data-character-filter]")];
  const chapters = [...app.querySelectorAll("[data-character-category]")];
  const updateSeparators = () => {
    let hasVisibleChapter = false;
    chapters.forEach((chapter) => {
      const separated = !chapter.hidden && hasVisibleChapter;
      chapter.classList.toggle("chapter-separated", separated);
      if (!chapter.hidden) hasVisibleChapter = true;
    });
  };
  updateSeparators();
  filterButtons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.characterFilter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    chapters.forEach((chapter) => {
      chapter.hidden = filter !== "전체" && chapter.dataset.characterCategory !== filter;
      if (!chapter.hidden) chapter.classList.add("visible");
    });
    updateSeparators();
    const firstVisible = chapters.find((chapter) => !chapter.hidden);
    if (firstVisible) firstVisible.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}

function initAutoplayVideos() {
  if (videoObserver) videoObserver.disconnect();
  const videos = [...app.querySelectorAll("[data-autoplay-video]")];
  videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (!video.src) video.src = video.dataset.src;
        const playAttempt = video.play();
        if (playAttempt) playAttempt.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: .12, rootMargin: "240px 0px" });
  videos.forEach((video) => videoObserver.observe(video));
}

function clampImageView() {
  const width = imageModalTarget.offsetWidth || 0;
  const height = imageModalTarget.offsetHeight || 0;
  const maxX = Math.max(0, width * (imageView.scale - 1) / 2);
  const maxY = Math.max(0, height * (imageView.scale - 1) / 2);
  imageView.x = Math.min(maxX, Math.max(-maxX, imageView.x));
  imageView.y = Math.min(maxY, Math.max(-maxY, imageView.y));
}

function paintImageView() {
  clampImageView();
  imageModalTarget.style.transform = `translate3d(${imageView.x}px, ${imageView.y}px, 0) scale(${imageView.scale})`;
  imageModalViewport.classList.toggle("is-zoomed", imageView.scale > 1.01);
  imageZoomOut.disabled = imageView.scale <= 1.01;
  imageZoomIn.disabled = imageView.scale >= 3.99;
}

function resetImageView() {
  imageView.scale = 1;
  imageView.x = 0;
  imageView.y = 0;
  imageView.pointers.clear();
  paintImageView();
}

function setImageScale(nextScale, clientX, clientY) {
  const previous = imageView.scale;
  const next = Math.min(4, Math.max(1, nextScale));
  if (clientX != null && clientY != null && previous !== next) {
    const rect = imageModalViewport.getBoundingClientRect();
    const focalX = clientX - rect.left - rect.width / 2;
    const focalY = clientY - rect.top - rect.height / 2;
    const ratio = next / previous;
    imageView.x = focalX - (focalX - imageView.x) * ratio;
    imageView.y = focalY - (focalY - imageView.y) * ratio;
  }
  imageView.scale = next;
  if (next === 1) {
    imageView.x = 0;
    imageView.y = 0;
  }
  paintImageView();
}

function closeImageModal() {
  imageModal.hidden = true;
  resetImageView();
  imageModalTarget.removeAttribute("src");
  imageModalTarget.alt = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, modalScrollY);
}

app.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-image-open]");
  if (!opener) return;
  const preview = opener.querySelector("img");
  modalScrollY = window.scrollY;
  imageModalTarget.src = opener.dataset.imageOpen;
  imageModalTarget.alt = preview?.alt || "확대 이미지";
  imageModal.hidden = false;
  document.body.style.position = "fixed";
  document.body.style.top = `-${modalScrollY}px`;
  document.body.style.width = "100%";
  requestAnimationFrame(resetImageView);
  imageModalClose.focus();
});

imageModalClose.addEventListener("click", closeImageModal);
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) closeImageModal();
});
imageZoomIn.addEventListener("click", () => setImageScale(imageView.scale + .5));
imageZoomOut.addEventListener("click", () => setImageScale(imageView.scale - .5));
imageZoomReset.addEventListener("click", resetImageView);
imageModalTarget.addEventListener("load", resetImageView);
imageModalViewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  setImageScale(imageView.scale + (event.deltaY < 0 ? .25 : -.25), event.clientX, event.clientY);
}, { passive: false });
imageModalViewport.addEventListener("dblclick", (event) => {
  setImageScale(imageView.scale > 1 ? 1 : 2, event.clientX, event.clientY);
});
imageModalViewport.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  imageModalViewport.setPointerCapture(event.pointerId);
  imageView.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (imageView.pointers.size === 1) {
    imageView.dragStartX = event.clientX;
    imageView.dragStartY = event.clientY;
    imageView.originX = imageView.x;
    imageView.originY = imageView.y;
  } else if (imageView.pointers.size === 2) {
    const [first, second] = [...imageView.pointers.values()];
    imageView.pinchDistance = Math.hypot(second.x - first.x, second.y - first.y);
    imageView.pinchScale = imageView.scale;
    imageView.pinchCenterX = (first.x + second.x) / 2;
    imageView.pinchCenterY = (first.y + second.y) / 2;
    imageView.originX = imageView.x;
    imageView.originY = imageView.y;
  }
});
imageModalViewport.addEventListener("pointermove", (event) => {
  if (!imageView.pointers.has(event.pointerId)) return;
  event.preventDefault();
  imageView.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (imageView.pointers.size === 2) {
    const [first, second] = [...imageView.pointers.values()];
    const distance = Math.hypot(second.x - first.x, second.y - first.y);
    const centerX = (first.x + second.x) / 2;
    const centerY = (first.y + second.y) / 2;
    imageView.scale = Math.min(4, Math.max(1, imageView.pinchScale * distance / Math.max(1, imageView.pinchDistance)));
    imageView.x = imageView.originX + centerX - imageView.pinchCenterX;
    imageView.y = imageView.originY + centerY - imageView.pinchCenterY;
    paintImageView();
  } else if (imageView.pointers.size === 1 && imageView.scale > 1) {
    imageView.x = imageView.originX + event.clientX - imageView.dragStartX;
    imageView.y = imageView.originY + event.clientY - imageView.dragStartY;
    paintImageView();
  }
});
const releaseImagePointer = (event) => {
  imageView.pointers.delete(event.pointerId);
  if (imageView.pointers.size === 1) {
    const remaining = [...imageView.pointers.values()][0];
    imageView.dragStartX = remaining.x;
    imageView.dragStartY = remaining.y;
    imageView.originX = imageView.x;
    imageView.originY = imageView.y;
  }
};
imageModalViewport.addEventListener("pointerup", releaseImagePointer);
imageModalViewport.addEventListener("pointercancel", releaseImagePointer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !imageModal.hidden) closeImageModal();
});

function render({ immediate = false } = {}) {
  clearTimeout(renderTimer);
  const view = getView(parseRoute());
  const commit = () => {
    app.innerHTML = view.html;
    app.classList.remove("page-out");
    app.classList.add("page-in");
    document.title = view.title;
    backButton.hidden = !view.detail;
    bottomNav.forEach((link) => link.classList.toggle("active", link.dataset.route === view.section));
    window.scrollTo(0, 0);
    initReveal();
    initCharacterFilters();
    initAutoplayVideos();
    requestAnimationFrame(() => app.focus({ preventScroll: true }));
  };

  if (immediate || !app.innerHTML) commit();
  else {
    app.classList.remove("page-in");
    app.classList.add("page-out");
    renderTimer = setTimeout(commit, 150);
  }
}

function setBgmState(playing) {
  bgmIcon.textContent = playing ? "■" : "▶";
  bgmToggle.setAttribute("aria-label", playing ? "배경음악 멈춤" : "배경음악 재생");
  bgmToggle.setAttribute("aria-pressed", String(playing));
  bgmToggle.classList.toggle("playing", playing);
}

async function playBgm() {
  try {
    await bgm.play();
    setBgmState(true);
    return true;
  } catch {
    setBgmState(false);
    return false;
  }
}

bgmToggle.addEventListener("click", async () => {
  if (bgm.paused) {
    bgmUserStopped = false;
    await playBgm();
  } else {
    bgm.pause();
    bgmUserStopped = true;
    setBgmState(false);
  }
});

bgmVolume.addEventListener("input", () => {
  const volume = Number(bgmVolume.value);
  bgm.volume = volume / 100;
  bgmVolume.style.setProperty("--volume-fill", `${volume}%`);
  bgmVolume.setAttribute("aria-valuetext", `${volume}퍼센트`);
});

const unlockBgm = async (event) => {
  if ((event.target instanceof Element && event.target.closest("[data-bgm-toggle]")) || document.activeElement === bgmToggle) return;
  if (!bgmUserStopped && bgm.paused) await playBgm();
  if (!bgm.paused || bgmUserStopped) {
    document.removeEventListener("pointerdown", unlockBgm);
    document.removeEventListener("keydown", unlockBgm);
  }
};

document.addEventListener("pointerdown", unlockBgm, { passive: true });
document.addEventListener("keydown", unlockBgm);
bgm.addEventListener("play", () => setBgmState(true));
bgm.addEventListener("pause", () => setBgmState(false));
playBgm();

backButton.addEventListener("click", () => {
  const [page] = parseRoute();
  location.hash = page === "character" ? "#/characters" : page === "faction" ? "#/factions" : "#/home";
});

window.addEventListener("hashchange", () => {
  if (!imageModal.hidden) closeImageModal();
  render();
});
window.addEventListener("pageshow", () => {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
});

if (!location.hash) history.replaceState(null, "", "#/home");
render({ immediate: true });
