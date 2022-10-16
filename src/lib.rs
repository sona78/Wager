#[forbid(unsafe_code)]

mod entrypoint;
pub mod instruction;
pub mod state;
pub mod processor;

pub use solana_program;
use solana_program::{pubkey::{Pubkey}, program_error::ProgramError, msg};

solana_program::declare_id!("EEjpJXCfHEqcRyAxW6tr3MNZqpP2MjAErkezFyp4HEah");

pub(crate) fn get_pot_address (name:[u8; 20]) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[&name], &id())
}

pub(crate) fn get_pot_address_checked (name : [u8; 20], pot_address : &Pubkey) -> Result<(Pubkey, u8), ProgramError> {
    let (derived_address, derived_bump_seed) = get_pot_address(name);
    msg!("{}", derived_address);
    msg!("{}", pot_address);
        if derived_address != *pot_address {
            msg!("Error: pot address derivation mismatch");
            return Err(ProgramError::InvalidArgument);
        } else {
            return Ok((derived_address, derived_bump_seed));
        }
}

pub(crate) fn get_player_address (bet_identifier:[u8; 20],funder_info : [u8;32]) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[&bet_identifier,&funder_info], &id())
}

pub(crate) fn get_player_address_checked (bet_identifier:[u8; 20],funder_info : [u8;32], player_address : &Pubkey) -> Result<(Pubkey, u8), ProgramError> {
    let (derived_address, derived_bump_seed) = get_player_address(bet_identifier, funder_info);
    msg!("{}", derived_address);
    msg!("{}", player_address);
        if derived_address != *player_address {
            msg!("Error: player address derivation mismatch");
            return Err(ProgramError::InvalidArgument);
        } else {
            return Ok((derived_address, derived_bump_seed));
        }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
