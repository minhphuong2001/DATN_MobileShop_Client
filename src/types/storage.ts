export interface StorageProps {
	_id?: string;
	name: string;
	createdAt?: string | Date;
	updatedAt?: string | Date;
}

export interface CateStorageProps{
	name: string;
	storage: string;
}