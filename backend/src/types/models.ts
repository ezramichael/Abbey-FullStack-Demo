export type User = {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string;
  bio: string;
  createdAt: string;
};

export type PublicUser = Omit<User, 'passwordHash'>;
export type RelationshipStatus = 'pending' | 'accepted' | 'rejected';
export type Relationship = { id: string; requesterId: string; recipientId: string; status: RelationshipStatus; createdAt: string };
