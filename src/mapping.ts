import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SwapTokens,
  Transfer,
  Unpaused
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BURNER_ROLE(...)
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.MINTER_ROLE(...)
  // - contract.PAUSER_ROLE(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.cap(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.getRoleAdmin(...)
  // - contract.hasRole(...)
  // - contract.increaseAllowance(...)
  // - contract.name(...)
  // - contract.paused(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleSwapTokens(event: SwapTokens): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}
