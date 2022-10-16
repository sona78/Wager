import * as BufferLayout from "@solana/buffer-layout";
import { Buffer } from "buffer";

export const isPhantomInstalled = window.phantom?.solana?.isPhantom;

export const getProvider = () => {
  if ("phantom" in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};

export async function connect(provider) {
  try {
    const resp = await provider.connect();
    console.log(resp.publicKey.toString());
    console.log(provider.isConnected);
    // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
  } catch (err) {
    // { code: 4001, message: 'User rejected the request.' }
  }
}

export function NewWagerInstruction(
  name,
  min_players,
  max_players,
  min_bet,
  max_bet,
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  option7,
  option8,
  timeframe
) {
  const layout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.seq(BufferLayout.u8(), 20, "name"),
    BufferLayout.u16("min_players"),
    BufferLayout.u16("max_players"),
    BufferLayout.u32("min_bet"),
    BufferLayout.u32("max_bet"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option1"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option2"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option3"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option4"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option5"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option6"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option7"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option8"),
    BufferLayout.u8("timeframe"),
  ]);
  const data = Buffer.alloc(layout.span);
  layout.encode(
    {
      instruction: 0,
      name: Buffer.from(name),
      min_players: min_players,
      max_players: max_players,
      min_bet: min_bet,
      max_bet: max_bet,
      option1: Buffer.from(option1),
      option2: Buffer.from(option2),
      option3: Buffer.from(option3),
      option4: Buffer.from(option4),
      option5: Buffer.from(option5),
      option6: Buffer.from(option6),
      option7: Buffer.from(option7),
      option8: Buffer.from(option8),
      timeframe: timeframe,
    },
    data
  );
  //console.log(data);
  return data;
}

export function MakeBetInstruction(name, amount, option) {
  const layout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.seq(BufferLayout.u8(), 20, "name"),
    BufferLayout.u32("amount"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option"),
  ]);
  const data = Buffer.alloc(layout.span);
  layout.encode(
    {
      instruction: 1,
      name: Buffer.from(name),
      amount: amount,
      option: Buffer.from(option),
    },
    data
  );
  //console.log(data);
  return data;
}

export function VoteInstruction(option) {
  const layout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option"),
  ]);
  const data = Buffer.alloc(layout.span);
  layout.encode(
    {
      instruction: 2,
      option: Buffer.from(option),
    },
    data
  );
  //console.log(data);
  return data;
}

export function QueryAccountInfo(option) {
  const layout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.seq(BufferLayout.u8(), 10, "option"),
  ]);
  const data = Buffer.alloc(layout.span);
  layout.encode(
    {
      instruction: 2,
      option: Buffer.from(option),
    },
    data
  );
  //console.log(data);
  return data;
}
