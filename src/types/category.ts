export interface CategoryProps {
	_id?: string;
	name: string;
	category_slug: string;
	logo: string;
	createdAt?: string | Date;
	updatedAt?: string | Date;
}

export interface CateCategoryProps{
	name: string;
	category_slug: string;
}