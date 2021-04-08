// !!!该数据H5和小程序中各一份，请同步维护
const projectLists = [
	{
		id: 1,
		icon: 'icon-tongjijuicon_shengke',
		path: 'provincialTech',
		name: '省级科技型中小企业',
		subsidy: '补助1万元',
		subsidyNum: 1, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'regDate', //注册日期
			'street', //街道

			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量
		],
		policyUrl: '',
		standard: `
			<p class="line">1、企业在<span class="blue">本省</span>注册时间<span class="blue">满1年</span></p>
			<p class="line">2、企业专利<span class="blue">或</span>软著<span class="blue">数量≥1件（法律状态须为：已授权）</span></p>
		`,
		standard2: `
			<p class="line">1、专利、软著（不含商标）<span class="blue">≥1件（法律状态须为：已授权）</span></p>
		`,
		condition:
			`
			1.在<span class="light">本省登记注册成立一年以上</span>，产权明晰，实行独立核算、自主经营、自负盈亏的经济实体;
			2.<span class="light">拥有自主知识产权</span>、专有技术或先进知识，包括：专利（申请或授权）、标准、商标、经认定的科技成果和其他专有技术，并具有基于自主知识产权、专有技术或先进知识获得的产品或服务
			`
	},
	{
		id: 2,
		icon: 'icon-tongjijuicon_shigao',
		path: 'cityTech',
		name: '市级高新技术企业',
		subsidy: '补助10万元',
		subsidyNum: 10, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'regDate', //注册日期
			'street', //街道

			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)
			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)
		],
		policyUrl: '',
		standard: `
			<p class="line">1、企业在<span class="blue">本市</span>注册时间<span class="blue">满1年</span></p>
			<p class="line">2、技术领域输入8大领域 </p>
			<p class="line">3、企业专利<span class="blue">或</span>软著<span class="blue">数量≥1件（法律状态须为：已授权）</span></p>
			<p class="line">4、最近一年销售收入小于3000万元（含）的企业</p>
			<p class="line line_in">研究开发费用总额占同期销售收入总额比例不低于5%</p>
			<p class="line line_i">最近一年销售收入在3000万元至1亿元（含）的企业</p>
			<p class="line line_in">研究开发费用总额占同期销售收入总额比例不低于4%</p>
			<p class="line line_i">最近一年销售收入在1亿元以上的企业</p>
			<p class="line line_in">研究开发费用总额占同期销售收入总额比例不低于3%</p>
		`,
		standard2: `
			<p class="line">1、杭州市注册<span class="blue">满1年</span></p>
			<p class="line">2、专利、软著（不含商标）<span class="blue">≥1件（法律状态须为：已授权）</span></p>
		`,
		condition:
			`
			1.企业申请认定时在杭州本市<span class="light">注册成立一年以上</span>;
			2.<span class="light">拥有自主知识产权</span>、专有技术或先进知识，包括：专利（申请或授权）、标准、商标、经认定的科技成果和其他专有技术，并具有基于自主知识产权、专有技术或先进知识获得的产品或服务;
			3.<span class="light">最近一年</span>销售收入小于3000万元（含）的企业，研究开发费用总额占同期销售收入总额比例不低于5%，最近一年销售收入在3000万元至1亿元（含）的企业，研究开发费用总额占同期销售收入总额比例不低于4%。最近一年销售收入在1亿元以上的企业，研究开发费用总额占同期销售收入总额比例不低于3%
			`
	},
	{
		id: 3,
		icon: 'icon-tongjijuicon_shijiqiye',
		path: 'cityTechCenter',
		name: '市级企业技术中心',
		subsidy: '补助20万元',
		subsidyNum: 20, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'qualification', //资质

			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)

			'companyNum', //企业人员总数
			'researchNum', //研发人员总数
			'seniorNum', //高级工程师数量
			'middleNum', //中级工程师数量
			'doctorNum', //博士数量
			'masterNum', //硕士数量
			'collegeNum', //本科生
			'juniorNum', //大专

		],
		policyUrl: '',
		standard: `
			<p class="line">1、杭州市注册企业，<span class="blue">已获评</span>国家重点扶持高新技术企业（国家高新技术企业）</p>
			<p class="line">2、研发经费总额近三年支出额<span class="blue">≥200万元</span></p>
			<p class="line">3、研发人员概数占企业人员概数<span class="blue">15%及以上</span></p>
			<p class="line line_i">本科及中级以上概数占研发人员概数<span class="blue">50%及以上</span></p>
		`,
		condition:
			`
			1.已获评<span class="light">国家高新技术企业</span>;
			2.研发经费总额近三年支出额<span class="light">不低于200万元</span>;
			3.<span class="light">科技活动人员</span>占企业职工总数的<span class="light">15%以上</span>；具有<span class="light">本科或以上学历及中级或以上职称</span>的工程技术人员不低于<span class="light">技术中心职工总数的50％</span>
			`
	},
	{
		id: 4,
		icon: 'icon-tongjijuicon_shigaoyanjiu',
		path: 'cityTechProCenter',
		name: '市级高新技术企业研究开发中心',
		subsidy: '补助20万元',
		subsidyNum: 20, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'regDate', //注册日期
			'street', //街道

			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'qualification', //资质

			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)
			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)

			'companyRoundNum', //企业人员概数
			'middleRoundNum', //本科及中级以上概数
			'researchRoundNum', //研发人员概数
			'companyNum', //企业人员总数
			'researchNum', //研发人员总数
			'seniorNum', //高级工程师数量
			'middleNum', //中级工程师数量
			'doctorNum', //博士数量
			'masterNum', //硕士数量
			'collegeNum', //本科生
			'juniorNum', //大专

		],
		policyUrl: '',
		standard: `
			<p class="line">1、企业在<span class="blue">本市</span>注册时间<span class="blue">满1年</span></p>
			<p class="line">2、<span class="blue">已获评</span>国家重点扶持高新技术企业（国家高新技术企业）</p>
			<p class="line">3、发明专利<span class="blue">≥1件</span>或集成电路布图设计专有权<span class="blue">≥1件</span>或实用新型专利+外观设计专利+软件著作权（不含商标）<span class="blue">≥4件（法律状态须为：已授权）</span></p>
			<p class="line">4、上一年（2018年）度企业研究开发费用总额占企业销售收入总额的比例<span class="blue">≥3%</span></p>
			<p class="line">5、研发人员概数<span class="blue">≥15人</span></p>
		`,
		condition:
			`
			1.在<span class="light">本市注册一年以上</span>，具有独立法人资格的<span class="light">国家高新技术企业</span>;
			2.自主研发1项以上发明专利或集成电路布图设计专有权，或4项以上实用新型专利+外观设计专利+软件著作权（不含商标）等自主知识产权;
			3.<span class="light">上一年度</span>企业研究开发费用总额占企业销售收入总额的比例达到3%以上;
			4.从事研究开发工作人员不少于15人
			`
	},
	{
		id: 5,
		icon: 'icon-tongjijuicon_shengqiyejis',
		path: 'provincialTechCenter',
		name: '省级企业技术中心',
		subsidy: '补助30万元',
		subsidyNum: 30, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'qualification', //资质

			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)

			'companyRoundNum', //企业人员概数
			'middleRoundNum', //本科及中级以上概数
			'researchRoundNum', //研发人员概数
			'companyNum', //企业人员总数
			'researchNum', //研发人员总数
			'seniorNum', //高级工程师数量
			'middleNum', //中级工程师数量
			'doctorNum', //博士数量
			'masterNum', //硕士数量
			'collegeNum', //本科生
			'juniorNum', //大专
		],
		policyUrl: '',
		standard: `
			<p class="line">1、市级企业技术中心1年<span class="blue">≥1年</span></p>
			<p class="line">2、<span class="blue">已获评</span>国家重点扶持高新技术企业（国家高新技术企业）</p>
			<p class="line">3、发明专利<span class="blue">≥1件</span>或集成电路布图设计专有权<span class="blue">≥1件</span>或实用新型专利+外观设计专利+软件著作权（不含商标）<span class="blue">≥4件（法律状态须为：已授权）</span></p>
			<p class="line">4、上一年（2018年）销售收入<span class="blue">≥2亿元</span></p>
			<p class="line">5、研发人员概数<span class="blue">≥50人</span></p>
		`,
		condition:
			`
			1.市级企业技术中心<span class="light">一年以上</span>;
			2.已获评<span class="light">国家高新技术企业</span>;
			3.拥有1项以上发明专利或4项以上实用新型专利+软件著作权+集成电路布图设计专有权+植物新品种等核心自主知识产权;
			4.企业年销售收入<span class="light">不低于2亿元</span>，研发人员总数<span class="light">不低于50人</span>;
			5.<span class="light">具有本科或以上学历及中级或以上职称</span>的工程技术人员不低于<span class="light">技术中心职工总数的50％</span>
			`
	},
	{
		id: 6,
		icon: 'icon-tongjijuicon_shenggaoyanj',
		path: 'provincialTechProCenter',
		name: '省级高新技术企业研究开发中心',
		subsidy: '补助30万元',
		subsidyNum: 30, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'street', //街道

			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'qualification', //资质

			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)
			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)

			'companyRoundNum', //企业人员概数
			'middleRoundNum', //本科及中级以上概数
			'researchRoundNum', //研发人员概数
			'companyNum', //企业人员总数
			'researchNum', //研发人员总数
			'seniorNum', //高级工程师数量
			'middleNum', //中级工程师数量
			'doctorNum', //博士数量
			'masterNum', //硕士数量
			'collegeNum', //本科生
			'juniorNum', //大专

			'haveResearchOrg', //是否设有研发机构或平台
			'researchOrgLevel', //机构或平台级别
		],
		policyUrl: '',
		standard: `
			<p class="line">1、在<span class="blue">浙江省注册+已获评</span>国家重点扶持高新技术企业（国家高新技术企业）</p>
			<p class="line">2、发明专利<span class="blue">≥1件</span>或实用新型专利+外观设计专利+软件著作权+集成电路布图设计专有权（不含商标）<span class="blue">≥4件（法律状态须为：已授权） </span></p>
			<p class="line">3、<span class="blue">已获评</span>市级高新技术企业研究开发中心</p>
			<p class="line">4、上一年度（2018年）研究开发费用总额占销售收入总额的比例符合如下要求：</p>
			<p class="line line_in">销售收入低于5000万元的，不低于6%；</p>
			<p class="line line_in">销售收入在5000万元至20000万元的，不低于4%；</p>
			<p class="line line_in">销售收入在20000万元以上的，不低于3%；</p>
			<p class="line line_in">或上年度研发费用超过1000万元；</p>
			<p class="line">5、设有独立的研发机构</p>
			<p class="line">6、研发人员概数<span class="blue"> ≥15人</span></p>
			<p class="line line_i">本科及中级以上概数占研发人员概数<span class="blue"> 60%及以上</span></p>
		`,
		condition:
			`
			1.在我省注册具有独立法人资格的<span class="light">国家高新技术企业</span>;
			2.近三年内通过自主研发、受让、受赠、并购等方式，或通过5年以上的独占许可方式，在其申报领域拥有自主知识产权;
			3.拥有1项以上发明专利或4项以上实用新型专利+软件著作权+集成电路布图设计专有权+植物新品种等核心自主知识产权;
			4.已经批准建立<span class="light">市级高新技术企业研发中心</span>;
			5.上一年度研究开发费用总额占销售收入总额的比例符合如下要求：<br />
			1)销售收入低于5000万元的，不低于6% <br />
			2)销售收入在5000万元至20000万元的，不低于4%<br />
			3)销售收入在20000万元以上的，不低于3%或1000万元;
			6.有独立的研发机构，研发机构专职工作人员不少于15人（软件类企业30人），具有本科以上学历或中级以上职称的工程技术人员不低于研发机构职工总数的60%
			`
	},
	{
		id: 7,
		icon: 'icon-tongjijuicon_zhongdakejij',
		path: 'cityBigProject',
		name: '杭州市重大科技计划项目',
		subsidy: '最高补助300万元',
		subsidyNum: 300, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)

			'qualification', //资质

			'haveResearchOrg', //是否设有研发机构或平台
			'researchOrgLevel', //机构或平台级别
		],
		policyUrl: '',
		standard: `
			<p class="line">1、杭州市注册企业，<span class="blue">已获评</span>国家重点扶持高新技术企业（国家高新技术企业）</p>
			<p class="line">2、<span class="blue">省级及以上</span>的研发机构</p>
			<p class="line">3、上年度（2018年）研发投入<span class="blue">≥1000万元</span></p>
		`,
		condition:
			`
			1.已获评<span class="light">国家高新技术企业</span>;
			2.省级及以上的研发机构;
			3.<span class="light">上年度研发投入在1000万元以上</span>。事业性机构项目负责人应在杭全职工作，并是国家、省“千人计划”、“万人计划”或杭州市“521”第一层次人才
			`
	},
	{
		id: 8,
		icon: 'icon-tongjijuicon_zhongdajishu',
		path: 'provincialBigProject',
		name: '浙江省重大科技计划项目',
		subsidy: '最高补助300万元',
		subsidyNum: 300, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)
			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)
		],
		policyUrl: '',
		standard: `
			<p class="line">1、上年（2018年）研发投入占销售收入比<span class="blue">≥1.5%</span></p>
		`,
		condition:
			`
			1.符合申报指南;
			2.申报单位有较强的研究基础、人才队伍和创新实力，已有的研究成果和转化应用实绩良好。企业为申报主体的，其<span class="light">上年研发投入占主营业务收入比重需达到或超过1.5%</span>。特殊项目上述要求可适当放宽
			`
	},
	{
		id: 9,
		icon: 'icon-tongjijuicon_hangzhoushiz',
		path: 'hzTryCenter',
		name: '杭州市专利试点企业',
		subsidy: '',
		subsidyNum: 0, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)
		],
		policyUrl: '',
		standard: `
			<p class="line">1、销售总收入<span class="blue">≥3000万元</span></p>
			<p class="line">2、专利折算分值<span class="blue">≥20分（法律状态须为：已授权）</span></p>
			<p class="line line_i"><span class="blue">国内发明专利每件5分，国内实用新型专利每件2分，国内外观设计专利每件1分</span></p>
		`,
		condition:
			`
			1.销售总收入<span class="light">不低于3000万</span>;
			2.企业专利创造能力较强。历年累计有效专利折算<span class="light">分值达到20分（含20分）</span>以上，分值计算方法是：国内发明专利每件5分，国内实用新型专利每件2分，国内外观设计专利每件1分
			`
	},
	{
		id: 10,
		icon: 'icon-tongjijuicon_hangzhoushis',
		path: 'hzTrySfCenter',
		name: '杭州市专利示范企业',
		subsidy: '',
		subsidyNum: 0, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)
		],
		policyUrl: '',
		standard: `
			<p class="line">1、杭州市专利试点企业</p>
			<p class="line">2、专利折算分值<span class="blue">≥30分（法律状态须为：已授权）</span></p>
			<p class="line line_i"><span class="blue">国内发明专利每件5分，国内实用新型专利每件2分，国内外观设计专利每件1分</span></p>
		`,
		condition:
			`
			1.杭州市专利试点企业;
			2.销售总收入<span class="light">不低于3000万</span>;
			3.企业专利创造能力较强。历年累计有效专利折算<span class="light">分值达到30分（含30分）</span>以上，分值计算方法是：国内发明专利每件5分，国内实用新型专利每件2分，国内外观设计专利每件1分
			`
	},
	{
		id: 11,
		icon: 'icon-tongjijuicon_guogao',
		path: 'nationalTech',
		name: '国家高新技术企业',
		subsidy: '补助60万元，所得税按15%征收',
		subsidyNum: 60, //最高补助
		reduction: 15, //最高税减百分比
		whiteKeyNameList: [
			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)
			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)
		],
		policyUrl: '',
		standard: `
			<p class="line">1、知识产权数量：1项发明／5项实用新型／5项外观设计／6项软件著作权（任意一项符合即可）</p>
			<p class="line">2、研发费用比例：研究开发费用总额/同期销售收入总额；合格线如下</p>
			<p class="line line_i">1）最近一年销售收入小于<span class="blue">5,000万元（含）</span>的企业，比例<span class="blue">不低于5%</span></p>
			<p class="line line_i">2）最近一年销售收入在<span class="blue">5,000万元至2亿元（含）</span>的企业，比例<span class="blue">不低于4%</span></p>
			<p class="line line_i">3）最近一年销售收入在<span class="blue">2亿元</span>以上的企业，比例<span class="blue">不低于3%</span></p>
			<p class="line">3、销售收入增长率<span class="blue">≥15%</span>或任意一年销售收入≥<span class="blue">≥200万</span></p>
			<p class="line line_i">计算方式：</p>
			<p class="line line_i">销售收入增长率＝1/2（第二年销售收入÷第一年销售收入＋第三年销售收入÷第二年销售收入）－1</p>
		`,
		standard2: `
			<p class="line">1、杭州市注册<span class="blue">满3年</span></p>
			<p class="line">2、发明专利<span class="blue">数量≥1件</span>或实用新型专利+外观设计专利+软件著作权（不含商标）<span class="blue">≥6件（法律状态须为：已授权）</span></p>
		`,
		condition:
			`
			1.拥有有效的自主知识产权（建议企业拥有1项发明或15项实用新型/软著/外观设计等）;
			2.研发费用比例：研究开发费用总额/同期销售收入总额：<br />
			1）最近一年销售收入小于5,000万元（含）的企业，比例不低于5%。<br />
			2）最近一年销售收入在5,000万元至2亿元（含）的企业，比例不低于4%。<br />
			3）最近一年销售收入在2亿元以上的企业，比例不低于3%;
			3.销售收入增长率≥15%或任意一年销售收入≥200万
			`
	},
	{
		id: 12,
		icon: 'icon-tongjijuicon_shikejixing',
		path: 'cityTechCultivate',
		name: '市科技型初创企业培育工程',
		subsidy: '最高补助30万元',
		subsidyNum: 30, //最高补助
		reduction: 0, //最高税减百分比
		whiteKeyNameList: [
			'regDate', //注册日期
			'regCapital', //注册资金
			'street', //街道

			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)
			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)
		],
		policyUrl: '',
		standard: `
			<p class="line">1、企业在<span class="blue">本市</span>注册时间<span class="blue">满1年</span>，注册资金<span class="blue">≤1000万元</span></p>
			<p class="line">2、企业专利<span class="blue">或</span>软著<span class="blue">数量≥1件（法律状态须为：已授权）</span></p>
			<p class="line">3、上年（2018年）研发投入占销售收入比<span class="blue">≥5%</span></p>
			<p class="line">4、上年度（2018年）销售收入<span class="blue">≤3000万元</span></p>
		`,
		condition:
			`
			1.杭州市范围登记、纳税，注册成立时间5年以内，且注册资金不高于1000万元;
			2.具备知识产权;
			3.2018年研发经费单独建账，研发投入占当年企业主营业务收入的5%以上;
			4.2018年销售额在3000万元人民币以下
			`
	},
	{
		id: 13,
		icon: 'icon-tongjijuicon_hangzhoushis1',
		path: 'competitionProject',
		name: '竞争性项目',
		subsidy: '最高补助30万元',
		ignore: true, //不计算补助
		whiteKeyNameList: [
			'regDate', //注册日期
			'regCapital', //注册资金
			'street', //街道

			'haveIntellectualProperty', //有无知识产权
			'inventionPatentNum', //发明专利数量
			'utilityModelPatentNum', //实用新型专利
			'industrialDesignPatentNum', //外观设计专利
			'softCopyrightNum', //软件著作权数量
			'workCopyrightNum', //作品著作权
			'icDesignNum', //集成电路布图设计专有权数量
			'intellectualPropertyIso', //知识产权贯标状态
			'effectiveTmNum', //有效商标数量

			'research2016Cost', //企业近三年研发费用(万元)
			'research2017Cost', //企业近三年研发费用(万元)
			'research2018Cost', //企业近三年研发费用(万元)
			'sale2016', //企业近三年销售收入(万元)
			'sale2017', //企业近三年销售收入(万元)
			'sale2018', //企业近三年销售收入(万元)
		],
		policyUrl: '',
		standard2: `
			<p class="line">1、已获评“<span class="blue">国家高新技术企业</span>”的企业</p>
		`,
		condition:
			`
			1.杭州市范围登记、纳税，注册成立时间5年以内，且注册资金不高于1000万元;
			2.具备知识产权;
			3.2018年研发经费单独建账，研发投入占当年企业主营业务收入的5%以上;
			4.2018年销售额在3000万元人民币以下
			`
	}
];

export default projectLists;
