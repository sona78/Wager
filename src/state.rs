use borsh::{BorshDeserialize, BorshSchema, BorshSerialize};
use solana_program::{
    //clock::UnixTimestamp,
    msg,
    program_error::ProgramError,
    program_pack::{Pack, Sealed},
};

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq, Default)]
pub struct Option {
    name : [u8;10],
    vote_count : u16,
}

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
pub struct WagerAccount {
    pub balance : u32,
    pub option1 : Option,
    pub option2 : Option,
    pub option3 : Option,
    pub option4 : Option,
    pub option5 : Option,
    pub option6 : Option,
    pub option7 : Option,
    pub option8 : Option,
    pub min_bet : u32,
    pub max_bet : u32,
    pub min_players : u16,
    pub max_players : u16,
    pub player_counter : u16,
    pub bump_seed : u8,
    pub state : WagerState,
}

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
pub enum WagerState {
    Uninitialized,
    Ongoing,
    Settled,
}

impl Sealed for WagerAccount {}
impl Pack for WagerAccount {
    const LEN: usize = 118;

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let data = self.try_to_vec().unwrap();
        dst[..data.len()].copy_from_slice(&data);
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let mut mut_src = src;
        Self::deserialize(&mut mut_src).map_err(|err| {
            msg!(
                "Error: failed to deserialize wager account: {}",
                err
            );
            ProgramError::InvalidAccountData
        })
    }
}

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
pub struct PlayerAccount {
    pub option : [u8; 10],
    pub bet_amount : u32,
    pub voted : u8,
    pub bump_seed :u8
}
impl Sealed for PlayerAccount {}
impl Pack for PlayerAccount {
    const LEN: usize = 16;

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let data = self.try_to_vec().unwrap();
        dst[..data.len()].copy_from_slice(&data);
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let mut mut_src = src;
        Self::deserialize(&mut mut_src).map_err(|err| {
            msg!(
                "Error: failed to deserialize player account: {}",
                err
            );
            ProgramError::InvalidAccountData
        })
    }
}
/*pub struct Contents {
    pub(crate) seed : [u8; 5],
    pub(crate) size : u8,
    pub(crate) options : u8,
}

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
pub enum Wager {
    Uninitialized,
    Ongoing(Contents),
    Settled(Contents),
}

impl Sealed for Wager {}
impl Pack for Wager {
    const LEN: usize = 8;

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let data = self.try_to_vec().unwrap();
        dst[..data.len()].copy_from_slice(&data);
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let mut mut_src = src;
        Self::deserialize(&mut mut_src).map_err(|err| {
            msg!(
                "Error: failed to deserialize wager account: {}",
                err
            );
            ProgramError::InvalidAccountData
        })
    }
}
 */