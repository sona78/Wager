#![cfg(not(feature = "no-entrypoint"))]

use solana_program::{
    pubkey::Pubkey,
    entrypoint, entrypoint::ProgramResult,
    account_info::AccountInfo,
};


entrypoint!(process_instruction);
pub fn process_instruction (
    program_id : &Pubkey,
    accounts : &[AccountInfo],
    instruction_data : &[u8]
) -> ProgramResult {
    crate::processor::process_instruction(program_id, accounts, instruction_data)
}