interface ILocalizedText {
	language: string;
	text: string;
}

interface IRegionOrProvince {
	code: string;
	isoCode: string;
	shortName: string;
	category: ILocalizedText[];
	name: ILocalizedText[];
	officialLanguages: string[];
	children?: IRegionOrProvince[];
}

type IBaseProvince = IRegionOrProvince[];

interface IHolidayName {
	language: string;
	text: string;
}

interface IHolidaySubdivisions {
	code: string;
	shortName: string;
}

interface IHoliday {
	id: string;
	startDate: string;
	endDate: string;
	type: string;
	name: IHolidayName[];
	regionalScope: string;
	temporalScope: string;
	nationwide: boolean;
	subdivisions: IHolidaySubdivisions[];
}

type IBaseHoliday = IHoliday[];

async function getProvince(): Promise<IBaseProvince | null> {
	const response = await fetch(
		"https://openholidaysapi.org/Subdivisions?countryIsoCode=ES&languageIsoCode=ES",
		{
			method: "GET",
			headers: { "content-type": "application/json;charset=UTF-8" },
		},
	);
	if (response.ok) {
		const province: IBaseProvince = await response.json();
		return province;
	}
	return null;
}

function flattenProvinces(provinces: IRegionOrProvince[]): IRegionOrProvince[] {
	const result: IRegionOrProvince[] = [];

	for (const province of provinces) {
		result.push(province);
		if (province.children && province.children.length > 0) {
			result.push(...flattenProvinces(province.children));
		}
	}

	return result;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeMarkdownV2(text: string): string {
	return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

function formatRegionListTelegram(regions: string[]): string {
	if (regions.length === 1) return `_${escapeMarkdownV2(regions[0])}_`;
	return `${regions
		.slice(0, -1)
		.map((r) => `_${escapeMarkdownV2(r)}_`)
		.join(", ")} y _${escapeMarkdownV2(regions.at(-1) || "")}_`;
}

async function getSpanishPublicHolidayTelegram(): Promise<string | null> {
	const provinces = await getProvince();
	if (provinces === null) {
		return null;
	}

	const year = "2025";
	const month = "03";
	const day = "31";

	const response = await fetch(
		`https://openholidaysapi.org/PublicHolidays?countryIsoCode=ES&languageIsoCode=ES&validFrom=${year}-01-01&validTo=${year}-12-31`,
		{
			method: "GET",
			headers: { "content-type": "application/json;charset=UTF-8" },
		},
	);

	if (!response.ok) return null;

	const holidays: IBaseHoliday = await response.json();
	const tomorrow_holidays: IHoliday[] = holidays.filter(
		(x) => x.startDate === `${year}-${month}-${day}`,
	);

	if (tomorrow_holidays.length === 0) return null;

	const holiday = tomorrow_holidays[0];

	if (holiday.nationwide === true) {
		const holidayName = escapeMarkdownV2(capitalize(holiday.name[0].text));
		return `📅 *Mañana es ${holidayName}*\n\n🔔 Acuérdate de quitar la alarma 🙏`;
	}

	if (holiday.subdivisions && holiday.subdivisions.length > 0) {
		const flatProvinces = flattenProvinces(provinces);

		const affected_regions = flatProvinces.filter((province) =>
			holiday.subdivisions.some((sub) => sub.code === province.code),
		);

		if (affected_regions.length > 0) {
			const regionNames = affected_regions.map((region) => region.name[0].text);
			const regionsText = formatRegionListTelegram(regionNames);
			const holidayName = escapeMarkdownV2(capitalize(holiday.name[0].text));

			return `📅 *Mañana es ${holidayName}* en ${regionsText}\n\n🔔 Acuérdate de quitar la alarma 🙏`;
		}
	}

	return null;
}
