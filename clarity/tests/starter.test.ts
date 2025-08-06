import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("Starter Contract Tests", () => {
  describe("Counter Functions", () => {
    it("should start with counter at 0", () => {
      const response = simnet.callReadOnlyFn(
        "starter",
        "get-counter",
        [],
        deployer
      );
      expect(response.result).toBeOk(Cl.uint(0));
    });

    it("should increment counter", () => {
      const incrementResponse = simnet.callPublicFn(
        "starter",
        "increment",
        [],
        wallet1
      );
      expect(incrementResponse.result).toBeOk(Cl.uint(1));

      const counterResponse = simnet.callReadOnlyFn(
        "starter",
        "get-counter",
        [],
        wallet1
      );
      expect(counterResponse.result).toBeOk(Cl.uint(1));
    });

    it("should increment multiple times", () => {
      // First increment
      let response = simnet.callPublicFn("starter", "increment", [], wallet1);
      expect(response.result).toBeOk(Cl.uint(1));

      // Second increment
      response = simnet.callPublicFn("starter", "increment", [], wallet2);
      expect(response.result).toBeOk(Cl.uint(2));

      // Third increment
      response = simnet.callPublicFn("starter", "increment", [], wallet1);
      expect(response.result).toBeOk(Cl.uint(3));

      // Verify final count
      const counterResponse = simnet.callReadOnlyFn(
        "starter",
        "get-counter",
        [],
        wallet1
      );
      expect(counterResponse.result).toBeOk(Cl.uint(3));
    });

    it("should decrement counter when greater than 0", () => {
      // First increment to 1
      simnet.callPublicFn("starter", "increment", [], wallet1);
      
      // Then decrement
      const decrementResponse = simnet.callPublicFn(
        "starter",
        "decrement",
        [],
        wallet1
      );
      expect(decrementResponse.result).toBeOk(Cl.uint(0));
    });

    it("should fail to decrement when counter is 0", () => {
      const response = simnet.callPublicFn(
        "starter",
        "decrement",
        [],
        wallet1
      );
      expect(response.result).toBeErr(Cl.uint(101)); // err-invalid-value
    });
  });

  describe("Message Functions", () => {
    it("should start with default message", () => {
      const response = simnet.callReadOnlyFn(
        "starter",
        "get-message",
        [],
        deployer
      );
      expect(response.result).toBeOk(Cl.stringUtf8("Hello, Stacks!"));
    });

    it("should allow owner to set message", () => {
      const newMessage = "Welcome to Stacks!";
      const response = simnet.callPublicFn(
        "starter",
        "set-message",
        [Cl.stringUtf8(newMessage)],
        deployer
      );
      expect(response.result).toBeOk(Cl.stringUtf8(newMessage));

      // Verify message was updated
      const getMessage = simnet.callReadOnlyFn(
        "starter",
        "get-message",
        [],
        deployer
      );
      expect(getMessage.result).toBeOk(Cl.stringUtf8(newMessage));
    });

    it("should prevent non-owner from setting message", () => {
      const response = simnet.callPublicFn(
        "starter",
        "set-message",
        [Cl.stringUtf8("Unauthorized message")],
        wallet1
      );
      expect(response.result).toBeErr(Cl.uint(100)); // err-owner-only
    });
  });

  describe("User Score Functions", () => {
    it("should return 0 for uninitialized user score", () => {
      const response = simnet.callReadOnlyFn(
        "starter",
        "get-user-score",
        [Cl.principal(wallet1)],
        deployer
      );
      expect(response.result).toBeOk(Cl.uint(0));
    });

    it("should allow owner to update user score", () => {
      const response = simnet.callPublicFn(
        "starter",
        "update-score",
        [Cl.principal(wallet1), Cl.uint(100)],
        deployer
      );
      expect(response.result).toBeOk(Cl.uint(100));

      // Verify score was updated
      const getScore = simnet.callReadOnlyFn(
        "starter",
        "get-user-score",
        [Cl.principal(wallet1)],
        deployer
      );
      expect(getScore.result).toBeOk(Cl.uint(100));
    });

    it("should prevent non-owner from updating user score", () => {
      const response = simnet.callPublicFn(
        "starter",
        "update-score",
        [Cl.principal(wallet2), Cl.uint(50)],
        wallet1
      );
      expect(response.result).toBeErr(Cl.uint(100)); // err-owner-only
    });

    it("should allow users to add to their own score", () => {
      const response = simnet.callPublicFn(
        "starter",
        "add-to-score",
        [Cl.uint(25)],
        wallet1
      );
      expect(response.result).toBeOk(Cl.uint(25));

      // Add more to score
      const response2 = simnet.callPublicFn(
        "starter",
        "add-to-score",
        [Cl.uint(30)],
        wallet1
      );
      expect(response2.result).toBeOk(Cl.uint(55));

      // Verify total score
      const getScore = simnet.callReadOnlyFn(
        "starter",
        "get-user-score",
        [Cl.principal(wallet1)],
        deployer
      );
      expect(getScore.result).toBeOk(Cl.uint(55));
    });

    it("should track scores for multiple users independently", () => {
      // User 1 adds score
      simnet.callPublicFn("starter", "add-to-score", [Cl.uint(10)], wallet1);
      
      // User 2 adds score
      simnet.callPublicFn("starter", "add-to-score", [Cl.uint(20)], wallet2);
      
      // User 1 adds more
      simnet.callPublicFn("starter", "add-to-score", [Cl.uint(15)], wallet1);

      // Check both scores
      const score1 = simnet.callReadOnlyFn(
        "starter",
        "get-user-score",
        [Cl.principal(wallet1)],
        deployer
      );
      expect(score1.result).toBeOk(Cl.uint(25));

      const score2 = simnet.callReadOnlyFn(
        "starter",
        "get-user-score",
        [Cl.principal(wallet2)],
        deployer
      );
      expect(score2.result).toBeOk(Cl.uint(20));
    });
  });

  describe("Contract Owner", () => {
    it("should return the correct contract owner", () => {
      const response = simnet.callReadOnlyFn(
        "starter",
        "get-contract-owner",
        [],
        wallet1
      );
      expect(response.result).toBeOk(Cl.principal(deployer));
    });
  });
});