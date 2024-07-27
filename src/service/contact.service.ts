import { googleOAuth2Client, googlePeople } from "../settings";

export const createContact = async ({
  firstName,
  lastName,
  phoneNumber,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  const requestBody = {
    names: [
      {
        givenName: firstName,
        familyName: lastName,
        displayName: `${firstName} ${lastName}`,
      },
    ],
    phoneNumbers: [{ value: phoneNumber }],
  };

  await googlePeople
    .createContact({
      auth: googleOAuth2Client,
      requestBody,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const doesContactExistByPhoneNumber = async (
  phoneNumber: string
): Promise<boolean> => {
  try {
    const response = await googlePeople.connections.list({
      auth: googleOAuth2Client,
      resourceName: "people/me",
      personFields: "phoneNumbers",
    });

    const { connections } = response.data;

    return (
      connections?.some(({ phoneNumbers }) =>
        phoneNumbers?.some(({ canonicalForm }) =>
          canonicalForm?.includes(phoneNumber)
        )
      ) ?? false
    );
  } catch (error) {
    throw error;
  }
};
