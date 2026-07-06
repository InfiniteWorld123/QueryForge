import type {
	GetUsersServiceType,
	UpdateCurrentUserServiceType,
} from "./users.type";

export const getCurrentUserService = async () => {
	return null;
};

export const updateCurrentUserService = async ({
	body,
}: {
	body: UpdateCurrentUserServiceType;
}) => {
	void body;
	return null;
};

export const getUsersService = async ({
	query,
}: {
	query?: GetUsersServiceType["query"];
}) => {
	void query;
	return [];
};
