use borsh::{BorshDeserialize,BorshSerialize,BorshSchema};
use solana_program::{
    program_pack::{Pack,Sealed},
    program_error::ProgramError,
    //borsh::get_packed_len,
    msg,
};

use crate::state::*;

#[derive(Clone,Debug,BorshSerialize,BorshDeserialize,BorshSchema,PartialEq)]
pub enum WagerInstruction {
    NewWager {
        #[allow(dead_code)]
        name : [u8; 20],
        #[allow(dead_code)]
        account_state : WagerAccount,
    },
    MakeBet {
        #[allow(dead_code)]
        bet_identifier : [u8;20],
        #[allow(dead_code)]
        player_state : PlayerAccount
    },
    VoteWinner {
        #[allow(dead_code)]
        outcome : u8,
    },
    View,
}
impl Sealed for WagerInstruction {}
impl Pack for WagerInstruction {
    const LEN : usize = 137;

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let data = self.pack_into_vec();
        dst[..data.len()].copy_from_slice(&data)
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, solana_program::program_error::ProgramError> {
        let mut mut_src = src;
        Self::deserialize(&mut mut_src).map_err(|err| {
            msg!(
                "Unable to deserialize wager instruction {}",
                err
            );
            ProgramError::InvalidInstructionData
        })
    }
}

impl WagerInstruction {
    fn pack_into_vec (&self) -> Vec<u8> {
        self.try_to_vec().expect("try_to_vec")
    }
}