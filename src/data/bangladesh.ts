export interface District {
  id: string;
  name: string;
  division: string;
}

export const DISTRICTS: District[] = [
  // Dhaka Division
  { id: 'dhaka',        name: 'Dhaka',        division: 'Dhaka' },
  { id: 'faridpur',     name: 'Faridpur',     division: 'Dhaka' },
  { id: 'gazipur',      name: 'Gazipur',      division: 'Dhaka' },
  { id: 'gopalganj',    name: 'Gopalganj',    division: 'Dhaka' },
  { id: 'kishoreganj',  name: 'Kishoreganj',  division: 'Dhaka' },
  { id: 'madaripur',    name: 'Madaripur',    division: 'Dhaka' },
  { id: 'manikganj',    name: 'Manikganj',    division: 'Dhaka' },
  { id: 'munshiganj',   name: 'Munshiganj',   division: 'Dhaka' },
  { id: 'narayanganj',  name: 'Narayanganj',  division: 'Dhaka' },
  { id: 'narsingdi',    name: 'Narsingdi',    division: 'Dhaka' },
  { id: 'rajbari',      name: 'Rajbari',      division: 'Dhaka' },
  { id: 'shariatpur',   name: 'Shariatpur',   division: 'Dhaka' },
  { id: 'tangail',      name: 'Tangail',      division: 'Dhaka' },
  // Chittagong Division
  { id: 'bandarban',    name: 'Bandarban',    division: 'Chittagong' },
  { id: 'brahmanbaria', name: 'Brahmanbaria', division: 'Chittagong' },
  { id: 'chandpur',     name: 'Chandpur',     division: 'Chittagong' },
  { id: 'chittagong',   name: 'Chittagong',   division: 'Chittagong' },
  { id: 'comilla',      name: 'Comilla',      division: 'Chittagong' },
  { id: 'coxsbazar',    name: "Cox's Bazar",  division: 'Chittagong' },
  { id: 'feni',         name: 'Feni',         division: 'Chittagong' },
  { id: 'khagrachhari', name: 'Khagrachhari', division: 'Chittagong' },
  { id: 'lakshmipur',   name: 'Lakshmipur',   division: 'Chittagong' },
  { id: 'noakhali',     name: 'Noakhali',     division: 'Chittagong' },
  { id: 'rangamati',    name: 'Rangamati',    division: 'Chittagong' },
  // Rajshahi Division
  { id: 'bogura',           name: 'Bogura',           division: 'Rajshahi' },
  { id: 'chapainawabganj',  name: 'Chapainawabganj',  division: 'Rajshahi' },
  { id: 'joypurhat',        name: 'Joypurhat',        division: 'Rajshahi' },
  { id: 'naogaon',          name: 'Naogaon',          division: 'Rajshahi' },
  { id: 'natore',           name: 'Natore',           division: 'Rajshahi' },
  { id: 'pabna',            name: 'Pabna',            division: 'Rajshahi' },
  { id: 'rajshahi',         name: 'Rajshahi',         division: 'Rajshahi' },
  { id: 'sirajganj',        name: 'Sirajganj',        division: 'Rajshahi' },
  // Khulna Division
  { id: 'bagerhat',  name: 'Bagerhat',  division: 'Khulna' },
  { id: 'chuadanga', name: 'Chuadanga', division: 'Khulna' },
  { id: 'jessore',   name: 'Jessore',   division: 'Khulna' },
  { id: 'jhenaidah', name: 'Jhenaidah', division: 'Khulna' },
  { id: 'khulna',    name: 'Khulna',    division: 'Khulna' },
  { id: 'kushtia',   name: 'Kushtia',   division: 'Khulna' },
  { id: 'magura',    name: 'Magura',    division: 'Khulna' },
  { id: 'meherpur',  name: 'Meherpur',  division: 'Khulna' },
  { id: 'narail',    name: 'Narail',    division: 'Khulna' },
  { id: 'satkhira',  name: 'Satkhira',  division: 'Khulna' },
  // Barishal Division
  { id: 'barguna',    name: 'Barguna',    division: 'Barishal' },
  { id: 'barishal',   name: 'Barishal',   division: 'Barishal' },
  { id: 'bhola',      name: 'Bhola',      division: 'Barishal' },
  { id: 'jhalokati',  name: 'Jhalokati',  division: 'Barishal' },
  { id: 'patuakhali', name: 'Patuakhali', division: 'Barishal' },
  { id: 'pirojpur',   name: 'Pirojpur',   division: 'Barishal' },
  // Sylhet Division
  { id: 'habiganj',    name: 'Habiganj',    division: 'Sylhet' },
  { id: 'moulvibazar', name: 'Moulvibazar', division: 'Sylhet' },
  { id: 'sunamganj',   name: 'Sunamganj',   division: 'Sylhet' },
  { id: 'sylhet',      name: 'Sylhet',      division: 'Sylhet' },
  // Rangpur Division
  { id: 'dinajpur',    name: 'Dinajpur',    division: 'Rangpur' },
  { id: 'gaibandha',   name: 'Gaibandha',   division: 'Rangpur' },
  { id: 'kurigram',    name: 'Kurigram',    division: 'Rangpur' },
  { id: 'lalmonirhat', name: 'Lalmonirhat', division: 'Rangpur' },
  { id: 'nilphamari',  name: 'Nilphamari',  division: 'Rangpur' },
  { id: 'panchagarh',  name: 'Panchagarh',  division: 'Rangpur' },
  { id: 'rangpur',     name: 'Rangpur',     division: 'Rangpur' },
  { id: 'thakurgaon',  name: 'Thakurgaon',  division: 'Rangpur' },
  // Mymensingh Division
  { id: 'jamalpur',   name: 'Jamalpur',   division: 'Mymensingh' },
  { id: 'mymensingh', name: 'Mymensingh', division: 'Mymensingh' },
  { id: 'netrokona',  name: 'Netrokona',  division: 'Mymensingh' },
  { id: 'sherpur',    name: 'Sherpur',    division: 'Mymensingh' },
];

export const UPAZILAS: Record<string, string[]> = {
  dhaka:        ['Dhanmondi', 'Gulshan', 'Mirpur', 'Mohammadpur', 'Motijheel', 'Tejgaon', 'Uttara', 'Wari', 'Savar', 'Keraniganj', 'Demra', 'Sabujbagh', 'Khilgaon', 'Lalbagh'],
  faridpur:     ['Faridpur Sadar', 'Alfadanga', 'Bhanga', 'Boalmari', 'Madhukhali', 'Nagarkanda', 'Saltha', 'Sadarpur'],
  gazipur:      ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sripur', 'Tongi'],
  gopalganj:    ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],
  kishoreganj:  ['Kishoreganj Sadar', 'Austagram', 'Bajitpur', 'Bhairab', 'Hossainpur', 'Itna', 'Katiadi', 'Kuliarchar', 'Pakundia', 'Tarail'],
  madaripur:    ['Madaripur Sadar', 'Kalkini', 'Rajoir', 'Shibchar'],
  manikganj:    ['Manikganj Sadar', 'Daulatpur', 'Ghior', 'Harirampur', 'Saturia', 'Shivalaya', 'Singair'],
  munshiganj:   ['Munshiganj Sadar', 'Gazaria', 'Lohajang', 'Sirajdikhan', 'Sreenagar', 'Tongibari'],
  narayanganj:  ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'],
  narsingdi:    ['Narsingdi Sadar', 'Belabo', 'Monohardi', 'Palash', 'Raipura', 'Shibpur'],
  rajbari:      ['Rajbari Sadar', 'Baliakandi', 'Goalanda', 'Kalukhali', 'Pangsha'],
  shariatpur:   ['Shariatpur Sadar', 'Bhedarganj', 'Damudya', 'Gosairhat', 'Naria', 'Zanjira'],
  tangail:      ['Tangail Sadar', 'Basail', 'Bhuapur', 'Delduar', 'Ghatail', 'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur'],

  bandarban:    ['Bandarban Sadar', 'Ali Kadam', 'Lama', 'Naikhongchhari', 'Rowangchhari', 'Ruma', 'Thanchi'],
  brahmanbaria: ['Brahmanbaria Sadar', 'Ashuganj', 'Bancharampur', 'Bijoynagar', 'Kasba', 'Nabinagar', 'Nasirnagar', 'Sarail'],
  chandpur:     ['Chandpur Sadar', 'Faridganj', 'Haimchar', 'Haziganj', 'Kachua', 'Matlab Dakshin', 'Matlab Uttar', 'Shahrasti'],
  chittagong:   ['Chittagong City', 'Anwara', 'Banshkhali', 'Boalkhali', 'Fatikchhari', 'Hathazari', 'Karnaphuli', 'Lohagara', 'Mirsarai', 'Patiya', 'Rangunia', 'Raozan', 'Sandwip', 'Satkania', 'Sitakunda'],
  comilla:      ['Comilla Sadar', 'Barura', 'Brahmanpara', 'Burichong', 'Chandina', 'Chauddagram', 'Daudkandi', 'Debidwar', 'Homna', 'Laksam', 'Muradnagar', 'Nangalkot', 'Titas'],
  coxsbazar:    ["Cox's Bazar Sadar", 'Chakaria', 'Kutubdia', 'Maheshkhali', 'Pekua', 'Ramu', 'Teknaf', 'Ukhia'],
  feni:         ['Feni Sadar', 'Chhagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Sonagazi', 'Fulgazi'],
  khagrachhari: ['Khagrachhari Sadar', 'Dighinala', 'Lakshmichhari', 'Mahalchhari', 'Manikchhari', 'Matiranga', 'Panchhari', 'Ramgarh'],
  lakshmipur:   ['Lakshmipur Sadar', 'Kamalnagar', 'Raipur', 'Ramganj', 'Ramgati'],
  noakhali:     ['Noakhali Sadar', 'Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya', 'Kabirhat', 'Senbagh', 'Sonaimuri', 'Subarnachar'],
  rangamati:    ['Rangamati Sadar', 'Bagaichhari', 'Barkal', 'Belaichhari', 'Juraichhari', 'Kaptai', 'Kaukhali', 'Langadu', 'Naniarchar'],

  bogura:          ['Bogura Sadar', 'Adamdighi', 'Dhunat', 'Dupchanchia', 'Gabtali', 'Kahaloo', 'Nandigram', 'Sariakandi', 'Shibganj', 'Sonatola'],
  chapainawabganj: ['Chapainawabganj Sadar', 'Bholahat', 'Gomastapur', 'Nachole', 'Shibganj'],
  joypurhat:       ['Joypurhat Sadar', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'],
  naogaon:         ['Naogaon Sadar', 'Atrai', 'Badalgachhi', 'Dhamoirhat', 'Mahadebpur', 'Manda', 'Niamatpur', 'Patnitala', 'Porsha', 'Raninagar', 'Sapahar'],
  natore:          ['Natore Sadar', 'Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Singra'],
  pabna:           ['Pabna Sadar', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Faridpur', 'Ishwardi', 'Santhia', 'Sujanagar'],
  rajshahi:        ['Rajshahi City', 'Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur', 'Paba', 'Puthia', 'Tanore'],
  sirajganj:       ['Sirajganj Sadar', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Shahjadpur', 'Tarash', 'Ullahpara'],

  bagerhat:  ['Bagerhat Sadar', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrelganj', 'Rampal', 'Sarankhola'],
  chuadanga: ['Chuadanga Sadar', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
  jessore:   ['Jessore Sadar', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha', 'Keshabpur', 'Manirampur', 'Sharsha'],
  jhenaidah: ['Jhenaidah Sadar', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'],
  khulna:    ['Khulna City', 'Batiaghata', 'Dacope', 'Dumuria', 'Dighalia', 'Koyra', 'Paikgachha', 'Phultala', 'Rupsa', 'Terokhada'],
  kushtia:   ['Kushtia Sadar', 'Bheramara', 'Daulatpur', 'Khoksa', 'Kumarkhali', 'Mirpur'],
  magura:    ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur'],
  meherpur:  ['Meherpur Sadar', 'Gangni', 'Mujibnagar'],
  narail:    ['Narail Sadar', 'Kalia', 'Lohagara'],
  satkhira:  ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar', 'Tala'],

  barguna:    ['Barguna Sadar', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali'],
  barishal:   ['Barishal City', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi', 'Hijla', 'Mehendiganj', 'Muladi', 'Wazirpur'],
  bhola:      ['Bhola Sadar', 'Burhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin'],
  jhalokati:  ['Jhalokati Sadar', 'Kathalia', 'Nalchity', 'Rajapur'],
  patuakhali: ['Patuakhali Sadar', 'Bauphal', 'Dashmina', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Rangabali'],
  pirojpur:   ['Pirojpur Sadar', 'Bhandaria', 'Kaukhali', 'Mathbaria', 'Nazirpur', 'Nesarabad', 'Zianagar'],

  habiganj:    ['Habiganj Sadar', 'Ajmiriganj', 'Bahubal', 'Baniyachong', 'Chunarughat', 'Lakhai', 'Madhabpur', 'Nabiganj'],
  moulvibazar: ['Moulvibazar Sadar', 'Barlekha', 'Juri', 'Kamalganj', 'Kulaura', 'Rajnagar', 'Sreemangal'],
  sunamganj:   ['Sunamganj Sadar', 'Bishwamvarpur', 'Chhatak', 'Derai', 'Dharampasha', 'Dowarabazar', 'Jagannathpur', 'Jamalganj', 'Sulla', 'Tahirpur'],
  sylhet:      ['Sylhet City', 'Balaganj', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Osmaninagar', 'South Surma', 'Zakiganj'],

  dinajpur:    ['Dinajpur Sadar', 'Birampur', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Fulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Nawabganj', 'Parbatipur'],
  gaibandha:   ['Gaibandha Sadar', 'Fulchhari', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj'],
  kurigram:    ['Kurigram Sadar', 'Bhurungamari', 'Char Rajibpur', 'Chilmari', 'Nageshwari', 'Phulbari', 'Rajarhat', 'Rowmari', 'Ulipur'],
  lalmonirhat: ['Lalmonirhat Sadar', 'Aditmari', 'Hatibandha', 'Kaliganj', 'Patgram'],
  nilphamari:  ['Nilphamari Sadar', 'Dimla', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Saidpur'],
  panchagarh:  ['Panchagarh Sadar', 'Atwari', 'Boda', 'Debiganj', 'Tetulia'],
  rangpur:     ['Rangpur City', 'Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgachha', 'Pirganj', 'Taraganj'],
  thakurgaon:  ['Thakurgaon Sadar', 'Baliadangi', 'Haripur', 'Pirganj', 'Ranisankail'],

  jamalpur:   ['Jamalpur Sadar', 'Baksiganj', 'Dewanganj', 'Islampur', 'Madarganj', 'Melandaha', 'Sarishabari'],
  mymensingh: ['Mymensingh City', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Nandail', 'Phulpur', 'Trishal'],
  netrokona:  ['Netrokona Sadar', 'Atpara', 'Barhatta', 'Durgapur', 'Kalmakanda', 'Kendua', 'Khaliajuri', 'Madan', 'Mohanganj', 'Purbadhala'],
  sherpur:    ['Sherpur Sadar', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi'],
};

export function isDhaka(districtId: string): boolean {
  return districtId === 'dhaka';
}

/** Delivery charge in BDT (Taka) */
export function getDeliveryFee(districtId: string): number {
  return isDhaka(districtId) ? 60 : 120;
}

export function getUpazilasForDistrict(districtId: string): string[] {
  return UPAZILAS[districtId] ?? [];
}

export function getDistrictName(districtId: string): string {
  return DISTRICTS.find(d => d.id === districtId)?.name ?? districtId;
}
